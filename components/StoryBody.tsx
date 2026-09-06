import Image from 'next/image';
import type { Block } from '@/lib/cms/types';
import { YouTubeVideo } from './YouTubeVideo';
import { youtubeId } from '@/lib/cms/validation';

export function StoryBody({ blocks, playLabel, notice }: { blocks: Block[]; playLabel: string; notice: string }) {
  return <div className="story-body">{blocks.map(block => {
    if (block.type === 'heading') return <h2 key={block.id}>{block.text}</h2>;
    if (block.type === 'paragraph') return <p key={block.id}>{block.text}</p>;
    if (block.type === 'image' && block.src) return <figure key={block.id}><Image src={block.src} alt={block.alt} width={1200} height={800} sizes="(max-width: 800px) 100vw, 800px" className="story-image" />{block.caption && <figcaption>{block.caption}</figcaption>}</figure>;
    const id = youtubeId(block.src);
    return id ? <figure key={block.id}><YouTubeVideo id={id} title={block.caption || block.alt || playLabel} playLabel={playLabel} notice={notice} />{block.caption && <figcaption>{block.caption}</figcaption>}</figure> : null;
  })}</div>;
}
