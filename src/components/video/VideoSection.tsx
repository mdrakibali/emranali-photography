'use client';

import React from 'react';
import { VideoItem } from '@/types/video';
import { Play, ArrowUpRight, MapPin, Film } from 'lucide-react';

interface VideoSectionProps {
  videos: VideoItem[];
}

export default function VideoSection({ videos }: VideoSectionProps) {
  // Display 4 curated video cards in a clean row
  const displayVideos = videos.slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-dark text-white border-b border-dark-border">
      <div className="site-container space-y-10">
        {/* Section Header */}
        <div className="space-y-2 border-b border-dark-border pb-6">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-white/70" />
            <span className="text-xs font-semibold tracking-wider text-white/60 uppercase">
              Motion & Field Recordings
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl text-white font-normal leading-tight">
            Through The Motion Lens
          </h2>
          <p className="text-sm text-white/70 font-normal max-w-2xl leading-relaxed">
            Behind-the-scenes wildlife footage, high-framerate avian observations, and field
            recordings from northern Bangladesh.
          </p>
        </div>

        {/* 4 Video Cards Grid (4 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayVideos.map((video) => (
            <a
              key={video.id}
              href={video.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-dark-surface border border-dark-border rounded-none overflow-hidden transition-all duration-300"
            >
              {/* Video Thumbnail with Hover Zoom & Play Trigger */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 z-10 px-2 py-0.5 bg-black/80 backdrop-blur-sm text-white text-[10px] font-semibold rounded-none border border-white/10">
                  {video.duration}
                </div>

                {/* Center Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-11 h-11 rounded-none bg-white/20 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-dark">
                    <Play className="w-4 h-4 fill-current translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Video Content & Metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-medium text-white/60 tracking-wider uppercase block">
                    {video.category}
                  </span>
                  <h3 className="text-base text-white font-semibold leading-snug group-hover:text-white/80 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed font-normal line-clamp-2 pt-1">
                    {video.description}
                  </p>
                </div>

                {/* Footer Location & Direct Watch Link */}
                <div className="pt-3 border-t border-dark-border flex items-center justify-between text-xs text-white/60">
                  <span className="flex items-center gap-1 truncate max-w-[140px] text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-white/50 flex-shrink-0" />
                    <span className="truncate">{video.location}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:underline transition-colors flex-shrink-0">
                    <span>Watch Video</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
