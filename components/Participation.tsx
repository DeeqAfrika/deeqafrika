'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Copy, ArrowUpRight, HeartHandshake } from 'lucide-react';
import type { CampaignContent } from '@/content';
import type { CampaignSettings } from '@/lib/cms/types';

export function Participation({ copy, settings }: { copy: CampaignContent; settings: CampaignSettings }) {
  const methods = settings.donationMethods.filter(method => method.enabled);
  const [selected, setSelected] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const method = methods.find(item => item.id === selected) ?? methods[0];
  const supporters = settings.supporters.filter(supporter => supporter.visible);
  const t = copy.participation;
  async function copyAccount() {
    try { await navigator.clipboard.writeText(method.account); setCopyMessage(t.copied); }
    catch { setCopyMessage(t.copyFailed); }
  }
  return <>
    <section className="donations-section section-dark" id="donate">
      <div className="container donation-layout">
        <div><p className="eyebrow eyebrow-light">{t.donateLabel}</p><h2>{t.donateTitle}</h2><p>{methods.length ? t.donateBody : t.donateUnavailable}</p>{!methods.length && <a className="button button-yellow" href={`mailto:${copy.contact.email}`}>{copy.contact.email}<ArrowUpRight size={18} /></a>}</div>
        <div className="donation-panel">
          {methods.length ? <>
            <label className="donation-select"><span>{t.selectMethod}</span><select value={method.id} onChange={event => { setSelected(event.target.value); setCopyMessage(''); }}>{methods.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
            <h3>{method.name}</h3><dl><div><dt>{t.recipient}</dt><dd>{method.recipient}</dd></div>{method.kind !== 'link' && <div><dt>{t.account}</dt><dd className="payment-account">{method.account}</dd></div>}{method.kind === 'crypto' && <div><dt>{t.network}</dt><dd>{method.network}</dd></div>}<div><dt>{t.currency}</dt><dd>{method.currency}</dd></div></dl>
            {method.instructions[copy.lang] && <p className="transfer-instructions">{method.instructions[copy.lang]}</p>}
            {method.kind === 'link' ? <a className="button button-yellow" href={method.url} target="_blank" rel="noopener noreferrer">{t.paymentLink}<ArrowUpRight size={18} /></a> : <><button className="button button-yellow" type="button" onClick={copyAccount}><Copy size={18} />{t.copyAccount}</button><p className="transfer-notice">{t.transferNotice}</p></>}
            <p role="status">{copyMessage}</p>
          </> : <><HeartHandshake size={40} aria-hidden="true" /><h3>{copy.brand.sloganOpen}<br />{copy.brand.sloganEqual}</h3><div className="payment-providers">{settings.donationMethods.map(item => <span key={item.id}>{item.name}</span>)}</div><p>{t.donateUnavailable}</p></>}
        </div>
      </div>
    </section>
    <section className="backers-section section-light" id="supporters"><div className="container"><div className="section-heading"><p className="eyebrow">{t.supportersLabel}</p><h2>{t.supportersTitle}</h2><p>{supporters.length ? t.supportersBody : t.supportersEmpty}</p></div>{supporters.length ? <div className="backers-grid">{supporters.map(item => <div className="backer" key={item.id}><div className="backer-logo"><Image src={item.logo} alt={item.name} fill sizes="(max-width: 600px) 50vw, 25vw" /></div><h3>{item.name}</h3>{item.description[copy.lang] && <p>{item.description[copy.lang]}</p>}{item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.name}><ArrowUpRight size={20} /></a>}</div>)}</div> : <a className="arrow-link" href={`mailto:${copy.contact.email}`}>{copy.contact.email}<ArrowUpRight size={18} /></a>}</div></section>
  </>;
}
