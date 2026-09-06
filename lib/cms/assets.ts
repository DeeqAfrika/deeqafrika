export const bundledAssets = [
  'ajax-youth-team.png', 'somalia-national-team.png', 'deeq-leadership-portrait.png', 'deeq-entrepreneurship.png',
  'deeq-campaign-portrait.jpg', 'deeq-main.jpg', 'deeq-stadium.jpg', 'deeq-sff-jersey.jpg', 'deeq-kids-united.jpg',
  'grassroots-laces.jpg', 'national-huddle.jpg', 'national-anthem.jpg', 'players-celebrate.jpg', 'kids-match.jpg',
  'certificate-girl.jpg', 'technical-center-training.jpg', 'technical-center-masterplan.jpg', 'competition-pathway.jpg',
].map(name => ({ name: name.replace(/\.[^.]+$/, '').replaceAll('-', ' '), url: `/images/${name}` }));
export function imageMime(bytes: Uint8Array): string | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  if ([137,80,78,71,13,10,26,10].every((v,i) => bytes[i] === v)) return 'image/png';
  const signature = new TextDecoder().decode(bytes.slice(0, 12));
  if (signature.startsWith('GIF87a') || signature.startsWith('GIF89a')) return 'image/gif';
  if (signature.startsWith('RIFF') && signature.slice(8) === 'WEBP') return 'image/webp';
  return null;
}
