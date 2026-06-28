import Image from "next/image";

/**
 * Decorative background blobs from the hero section, using the real
 * assets exported from Figma (Dev Mode > Export, SVG).
 *
 * All positions below are confirmed from Figma Dev Mode (Layout panel:
 * Width / Height / Top / Left / Rotation), measured relative to the
 * "Landing page" frame, confirmed Fixed at 1440 x 1024px.
 *
 * That frame covers the whole landing page (hero + into "How it works"),
 * but these blobs only live in the hero. So this component renders inside
 * a wrapper sized to the same 1440:1024 aspect ratio as the source frame
 * (see FRAME_ASPECT_RATIO below) rather than stretching to fill whatever
 * height the hero's content happens to need. Inside that fixed-aspect box,
 * every top/left/width/height is a plain percentage of 1440/1024, so the
 * whole illustration scales as one proportional unit at any viewport width.
 */

const FRAME_WIDTH = 1440;
const FRAME_HEIGHT = 1024;

interface BlobSpec {
  src: string;
  alt: string;
  width: number;
  height: number;
  top: number;
  left: number;
  rotation?: number;
}

const BLOBS: BlobSpec[] = [
  {
    src: "/assets/blobs/blob-chartreuse.svg",
    alt: "",
    width: 290.73,
    height: 259.85,
    top: -63.14,
    left: 911.84,
  },
  {
    src: "/assets/blobs/squiggle-orange-topright.svg",
    alt: "",
    width: 120.92,
    height: 142.79,
    top: -10.39,
    left: 1333.78,
  },
  {
    src: "/assets/blobs/blob-dark-pink.svg",
    alt: "",
    width: 150.51,
    height: 150.51,
    top: 158,
    left: 693,
  },
  {
    src: "/assets/blobs/blob-emerald.svg",
    alt: "",
    width: 200.68,
    height: 212.26,
    top: 212.16,
    left: 1169.12,
  },
  {
    src: "/assets/blobs/blob-dark-blue.svg",
    alt: "",
    width: 216.12,
    height: 222.55,
    top: 333.64,
    left: 866.37,
  },
  {
    src: "/assets/blobs/circle-light-pink.svg",
    alt: "",
    width: 150.51,
    height: 150.51,
    top: 452,
    left: 1370,
  },
  {
    src: "/assets/blobs/blob-yellow.svg",
    alt: "",
    width: 252.14,
    height: 246.99,
    top: 550.48,
    left: 1077.79,
  },
  {
    src: "/assets/blobs/squiggle-orange-small.svg",
    alt: "",
    width: 121.33,
    height: 142.84,
    top: 578.27,
    left: 757.72,
    rotation: -153.56,
  },
  {
    src: "/assets/blobs/half-circle-light-blue.svg",
    alt: "",
    width: 200.68,
    height: 102.91,
    top: 673.09,
    left: 454,
    rotation: 180,
  },
];

export function HeroBlobs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 m-auto"
        style={{
          aspectRatio: `${FRAME_WIDTH} / ${FRAME_HEIGHT}`,
          width: "100%",
          maxHeight: "100%",
        }}
      >
        {BLOBS.map((blob, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              width: `${(blob.width / FRAME_WIDTH) * 100}%`,
              top: `${(blob.top / FRAME_HEIGHT) * 100}%`,
              left: `${(blob.left / FRAME_WIDTH) * 100}%`,
              aspectRatio: `${blob.width} / ${blob.height}`,
              transform: blob.rotation ? `rotate(${blob.rotation}deg)` : undefined,
            }}
          >
            <Image
              src={blob.src}
              alt={blob.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
