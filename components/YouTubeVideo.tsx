'use client';
import { useState } from 'react';
import { Play } from 'lucide-react';
export function YouTubeVideo({ id, title, playLabel, notice }: { id: string; title: string; playLabel: string; notice: string }) {
  const [playing, setPlaying] = useState(false);
  return <div className="youtube-video">{playing ? <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <button type="button" onClick={() => setPlaying(true)}><Play size={40} aria-hidden="true" /><strong>{playLabel}</strong><span>{notice}</span></button>}</div>;
}
