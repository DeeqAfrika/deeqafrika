import Image, { type ImageProps } from 'next/image';
import type { ImageAsset } from '@/lib/cms/types';

export function CampaignImage({ asset, ...props }: { asset: ImageAsset } & Omit<ImageProps, 'src' | 'alt'>) {
  return <Image {...props} src={asset.src} alt={asset.alt} style={{ objectPosition: asset.position, ...props.style }} />;
}
