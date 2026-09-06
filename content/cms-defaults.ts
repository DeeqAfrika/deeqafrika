import type { Language } from './types';
import type { CampaignSettings, ImageAsset, ImageSlot } from '@/lib/cms/types';

export function defaultImages(lang: Language): Record<ImageSlot, ImageAsset> {
  const so = lang === 'so';
  const asset = (file: string, en: string, somali: string, position = '50% 50%'): ImageAsset => ({ src: `/images/${file}`, alt: so ? somali : en, position });
  return {
    homeHero: asset('deeq-campaign-portrait.jpg', 'Deeq Afrika campaign portrait with the Somali flag', 'Sawirka ololaha Deeq Afrika iyo calanka Soomaaliya', '50% 24%'),
    homeCommunity: asset('deeq-kids-united.jpg', 'Deeq Afrika with a young footballer and a youth team', 'Deeq Afrika oo la jooga ciyaaryahan yar iyo koox dhalinyaro ah', '50% 35%'),
    homeVision: asset('national-huddle.jpg', 'Somalia players gathered in a team huddle', 'Ciyaartoyda Soomaaliya oo isku duuban'),
    homeRegions: asset('technical-center-training.jpg', 'Concept illustration of training at a proposed regional technical centre', 'Sawir fikradeed tababbar ka socda xarun farsamo oo gobol oo la soo jeediyay'),
    visionHero: asset('national-huddle.jpg', 'Somalia national team in a huddle', 'Xulka Qaranka Soomaaliya oo isku duuban'),
    visionMasterplan: asset('technical-center-masterplan.jpg', 'Concept masterplan for a proposed regional technical centre', 'Qorshe fikradeed xarun farsamo oo gobol oo la soo jeediyay'),
    planHero: asset('kids-match.jpg', 'Young players taking part in a football match', 'Ciyaartoy yaryar oo ka qaybgalaya ciyaar kubadeed'),
    aboutHero: asset('deeq-main.jpg', 'Portrait of Deeq Afrika', 'Sawirka Deeq Afrika', '50% 25%'),
    aboutLeadership: asset('deeq-sff-jersey.jpg', 'Deeq Afrika at a football ground', 'Deeq Afrika oo jooga garoon kubadeed', '65% 35%'),
    journeyPlayer: asset('ajax-youth-team.png', 'Ajax youth football team posing on the pitch', 'Kooxda dhalinyarada Ajax'),
    journeyInternational: asset('somalia-national-team.png', 'Somalia national players lined up at the stadium', 'Xulka Qaranka Soomaaliya oo safan garoonka', '50% 60%'),
    journeyBuilder: asset('deeq-leadership-portrait.png', 'Deeq Afrika at the Somali Football Federation', 'Deeq Afrika oo jooga Xiriirka Kubadda Cagta Soomaaliyeed', '50% 12%'),
    journeyLeader: asset('deeq-entrepreneurship.png', 'Deeq Afrika taking part in an award presentation', 'Deeq Afrika oo ka qaybgalaya xaflad abaalmarin', '50% 25%'),
    newsHero: asset('deeq-stadium.jpg', 'Deeq Afrika with the Somali flag at a stadium', 'Deeq Afrika iyo calanka Soomaaliya oo jooga garoon', '50% 25%'),
    mediaHero: asset('players-celebrate.jpg', 'Somalia football players celebrating together', 'Ciyaartoy Soomaaliyeed oo wada dabbaaldegaya'),
    joinHero: asset('grassroots-laces.jpg', 'Deeq Afrika helping a young footballer with his boots', 'Deeq Afrika oo ciyaaryahan yar ka caawinaya kabaha', '50% 56%'),
  };
}
export const defaultSettings: CampaignSettings = {
  donationMethods: ['EVC Plus', 'eDahab', 'Zaad', 'Sahal', 'PremierWallet', 'USDT'].map((name, index) => ({ id: `method-${index}`, name, kind: name === 'USDT' ? 'crypto' : 'mobile', enabled: false, account: '', recipient: '', network: '', currency: name === 'USDT' ? 'USDT' : 'USD', url: '', instructions: { en: '', so: '' } })),
  supporters: [],
};
export function participationCopy(lang: Language) {
  return lang === 'en' ? {
    donateLabel: 'Support the vision', donateTitle: 'Help move Somali football forward.', donateBody: 'Choose a payment method to see the campaign’s receiving details and transfer instructions.', donateUnavailable: 'Donation details will be shared here once confirmed. Contact the campaign to discuss supporting the vision.',
    supportersLabel: 'Together for Somali football', supportersTitle: 'Backing a shared vision.', supportersBody: 'Organisations and community partners supporting the campaign.', supportersEmpty: 'Bring your organisation into the conversation. Contact the campaign to express your support.',
    conceptCaption: 'Proposed concept · Vision 2034', signupError: 'We could not save your registration. Please try again or contact the campaign directly.', signupPending: 'Registering…',
    transferNotice: 'Make your transfer in your payment app using the details below. This website does not process or confirm transfers.', recipient: 'Account name', account: 'Receiving account', network: 'Network', currency: 'Currency', copyAccount: 'Copy account', copied: 'Copied', copyFailed: 'Please select and copy the account above.', paymentLink: 'Open payment page', selectMethod: 'Choose a payment method',
    readStory: 'Read story', backNews: 'Back to news', videoConsent: 'Play on YouTube', videoNotice: 'Playing this video connects to YouTube.', privacy: 'Your details are stored securely and used only to contact you about the campaign. Contact the campaign to request removal.',
  } : {
    donateLabel: 'Taageer aragtida', donateTitle: 'Ka qaybqaado horumarinta kubadda cagta Soomaaliyeed.', donateBody: 'Dooro habka lacag bixinta si aad u aragto faahfaahinta iyo tilmaamaha wareejinta.', donateUnavailable: 'Faahfaahinta deeqaha halkan ayaa lagu soo bandhigi doonaa marka la xaqiijiyo. La xiriir ololaha si aad u taageerto aragtida.',
    supportersLabel: 'Wadajir kubadda cagta Soomaaliyeed', supportersTitle: 'Taageeridda aragti wadaag ah.', supportersBody: 'Ururrada iyo bahwadaagta bulshada ee taageeraya ololaha.', supportersEmpty: 'Ururkaaga ku soo biiri wada hadalka. La xiriir ololaha si aad u muujiso taageeradaada.',
    conceptCaption: 'Fikrad la soo jeediyay · Aragti 2034', signupError: 'Diiwaangelinta lama kaydin. Fadlan isku day mar kale ama si toos ah ula xiriir ololaha.', signupPending: 'Waa la diiwaangelinayaa…',
    transferNotice: 'Lacagta ku dir adeeggaaga adigoo isticmaalaya faahfaahinta hoose. Boggan ma fuliyo mana xaqiijiyo wareejinta lacagta.', recipient: 'Magaca koontada', account: 'Koontada lacagta qaadanaysa', network: 'Shabakadda', currency: 'Nooca lacagta', copyAccount: 'Nuqul ka samee koontada', copied: 'Waa la koobiyeeyay', copyFailed: 'Fadlan xulo oo nuqul ka samee koontada kore.', paymentLink: 'Fur bogga lacag bixinta', selectMethod: 'Dooro habka lacag bixinta',
    readStory: 'Akhri warka', backNews: 'Ku noqo wararka', videoConsent: 'Ka daawo YouTube', videoNotice: 'Daawashada muuqaalkan waxay ku xiraysaa YouTube.', privacy: 'Xogtaada si ammaan ah ayaa loo kaydiyaa waxaana loo adeegsadaa xiriirka ololaha oo keliya. La xiriir ololaha si aad u codsato in la tirtiro.',
  };
}
