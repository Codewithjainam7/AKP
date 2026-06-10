import React from 'react';

/* ─── Shimmer Style Injector ─────────────────────────────────────── */
const ShimmerStyles = () => (
  <style>{`
    @keyframes shimmer {
      0%   { background-position: -700px 0; }
      100% { background-position:  700px 0; }
    }
    .sk {
      background: linear-gradient(90deg, #e8e8e8 25%, #f0f0f0 50%, #e8e8e8 75%);
      background-size: 700px 100%;
      animation: shimmer 1.4s infinite linear;
      border-radius: 8px;
    }
    .sk-dark {
      background: linear-gradient(90deg, #1e1e2a 25%, #252535 50%, #1e1e2a 75%);
      background-size: 700px 100%;
      animation: shimmer 1.4s infinite linear;
      border-radius: 8px;
    }
  `}</style>
);

/* ─── Shared Navbar Skeleton ─────────────────────────────────────── */
const NavbarSkeleton = ({ dark = false }) => {
  const S = dark ? 'sk-dark' : 'sk';
  const bg = dark ? 'bg-[#0F0F11] border-white/5' : 'bg-white border-gray-100';
  return (
    <div className={`w-full h-16 ${bg} border-b flex items-center px-8 gap-6 shrink-0`}>
      <div className={`h-8 w-28 ${S}`} />
      <div className="flex-1" />
      <div className={`h-4 w-14 ${S}`} />
      <div className={`h-4 w-16 ${S}`} />
      <div className={`h-4 w-14 ${S}`} />
      <div className={`h-9 w-24 rounded-full ${S}`} />
    </div>
  );
};

/* ─── HOME PAGE SKELETON ─────────────────────────────────────────── */
export function HomeSkeleton() {
  return (
    <div className="flex flex-col h-screen bg-[#FAFAFA] overflow-hidden">
      <ShimmerStyles />
      <NavbarSkeleton />
      <div className="flex flex-1 items-center justify-center px-8 lg:px-20 gap-16 overflow-hidden">
        {/* Left text */}
        <div className="flex-1 flex flex-col gap-5 max-w-xl">
          <div className="sk h-4 w-24 rounded-full" />
          <div className="sk h-16 w-full rounded-2xl" />
          <div className="sk h-16 w-3/4 rounded-2xl" />
          <div className="sk h-5 w-full" />
          <div className="sk h-5 w-5/6" />
          <div className="sk h-5 w-2/3" />
          <div className="flex gap-5 mt-3 items-center">
            <div className="sk h-12 w-40 rounded-full" />
            <div className="h-8 w-px bg-gray-200" />
            <div className="flex gap-6">
              {[1, 2].map(i => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="sk h-6 w-12" />
                  <div className="sk h-3 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right image blob */}
        <div className="hidden lg:flex items-center justify-center w-[420px] h-[420px] shrink-0">
          <div className="sk w-80 h-80" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }} />
        </div>
      </div>
    </div>
  );
}

/* ─── CARD LIST SKELETON (Research Papers, Patents, Copyrights, Certs) */
function CardListSkeleton({ dark = true, cardCount = 6, title = true }) {
  const S = dark ? 'sk-dark' : 'sk';
  const bg = dark ? 'bg-[#0F0F11]' : 'bg-[#FAFAFA]';
  return (
    <div className={`flex flex-col min-h-screen ${bg} overflow-hidden`}>
      <ShimmerStyles />
      <NavbarSkeleton dark={dark} />
      <div className="container mx-auto px-6 lg:px-12 pt-32 pb-20">
        {title && (
          <div className="mb-14">
            <div className={`${S} h-5 w-32 mb-5 rounded-full`} />
            <div className={`${S} h-14 w-96 mb-4 rounded-2xl`} />
            <div className={`${S} h-6 w-64 rounded-xl`} />
          </div>
        )}
        {/* Filter bar */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`${S} h-9 w-24 rounded-full`} />
          ))}
        </div>
        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: cardCount }).map((_, i) => (
            <div key={i} className={`rounded-[24px] p-6 ${dark ? 'bg-white/[0.03] border border-white/5' : 'bg-white border border-gray-100'} flex flex-col gap-4`}>
              <div className={`${S} h-5 w-20 rounded-full`} />
              <div className={`${S} h-6 w-full rounded-xl`} />
              <div className={`${S} h-4 w-5/6 rounded-lg`} />
              <div className={`${S} h-4 w-3/4 rounded-lg`} />
              <div className={`${S} h-4 w-2/3 rounded-lg`} />
              <div className="flex gap-3 mt-2">
                <div className={`${S} h-9 flex-1 rounded-xl`} />
                <div className={`${S} h-9 flex-1 rounded-xl`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── CAREER PAGE SKELETON ───────────────────────────────────────── */
export function CareerSkeleton() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0F0F11] overflow-hidden">
      <ShimmerStyles />
      <NavbarSkeleton dark />
      <div className="container mx-auto px-6 lg:px-12 pt-32 pb-20">
        {/* Hero text */}
        <div className="mb-20">
          <div className="sk-dark h-20 w-96 mb-6 rounded-3xl" />
          <div className="sk-dark h-20 w-72 mb-8 rounded-3xl" />
          <div className="sk-dark h-6 w-full max-w-2xl mb-3" />
          <div className="sk-dark h-6 w-4/5 max-w-2xl" />
        </div>
        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="rounded-[32px] bg-white/[0.03] border border-white/5 p-8 flex flex-col gap-4">
              <div className="sk-dark h-6 w-6 rounded-full" />
              <div className="sk-dark h-8 w-16 rounded-xl" />
              <div className="sk-dark h-3 w-24 rounded-full" />
            </div>
          ))}
        </div>
        {/* Timeline */}
        <div className="flex flex-col gap-8 max-w-3xl">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="sk-dark w-4 h-4 rounded-full shrink-0" />
                <div className="sk-dark w-0.5 flex-1 mt-2 rounded-full" style={{ minHeight: 80 }} />
              </div>
              <div className="flex-1 pb-8">
                <div className="sk-dark h-3 w-24 mb-3 rounded-full" />
                <div className="sk-dark h-6 w-64 mb-2 rounded-xl" />
                <div className="sk-dark h-4 w-48 mb-4 rounded-lg" />
                <div className="sk-dark h-4 w-full rounded-lg" />
                <div className="sk-dark h-4 w-5/6 rounded-lg mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── RESEARCH PAGE SKELETON ─────────────────────────────────────── */
export function ResearchSkeleton() {
  return <CardListSkeleton dark cardCount={6} />;
}

/* ─── RESEARCH PAPERS PAGE SKELETON ─────────────────────────────── */
export function ResearchPapersSkeleton() {
  return <CardListSkeleton dark cardCount={6} />;
}

/* ─── PATENTS PAGE SKELETON ──────────────────────────────────────── */
export function PatentsSkeleton() {
  return <CardListSkeleton dark cardCount={6} />;
}

/* ─── COPYRIGHT PAGE SKELETON ────────────────────────────────────── */
export function CopyrightSkeleton() {
  return <CardListSkeleton dark cardCount={6} />;
}

/* ─── CERTIFICATIONS PAGE SKELETON ──────────────────────────────── */
export function CertificationsSkeleton() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0F0F11] overflow-hidden">
      <ShimmerStyles />
      <NavbarSkeleton dark />
      <div className="container mx-auto px-6 lg:px-12 pt-32 pb-20">
        <div className="mb-14">
          <div className="sk-dark h-5 w-32 mb-5 rounded-full" />
          <div className="sk-dark h-14 w-80 mb-4 rounded-2xl" />
        </div>
        {/* Cert cards - larger with image area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-[24px] overflow-hidden bg-white/[0.03] border border-white/5 flex flex-col">
              <div className="sk-dark h-44 w-full rounded-none" />
              <div className="p-5 flex flex-col gap-3">
                <div className="sk-dark h-5 w-full rounded-lg" />
                <div className="sk-dark h-4 w-2/3 rounded-lg" />
                <div className="sk-dark h-3 w-24 rounded-full" />
                <div className="sk-dark h-8 w-full rounded-xl mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ADMIN DASHBOARD SKELETON ──────────────────────────────────── */
export function AdminDashboardSkeleton() {
  const tabs = [1, 2, 3, 4, 5, 6];
  return (
    <div className="flex flex-col min-h-screen bg-[#070709] overflow-hidden">
      <ShimmerStyles />

      {/* Top Navbar */}
      <div className="w-full h-16 bg-[#0a0a0f]/80 border-b border-white/[0.04] flex items-center px-8 gap-6 shrink-0">
        <div className="sk-dark h-8 w-28" />
        <div className="flex-1" />
        <div className="sk-dark h-4 w-14" />
        <div className="sk-dark h-4 w-16" />
        <div className="sk-dark h-9 w-24 rounded-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl pt-10 pb-20">

        {/* Header Bar */}
        <div className="bg-[#111115]/50 border border-white/[0.05] rounded-[28px] p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="sk-dark h-4 w-24 rounded-full" />
            <div className="sk-dark h-8 w-56 rounded-2xl" />
            <div className="sk-dark h-4 w-80 rounded-lg" />
          </div>
          <div className="flex gap-3">
            <div className="sk-dark h-11 w-36 rounded-xl" />
            <div className="sk-dark h-11 w-36 rounded-xl" />
            <div className="sk-dark h-11 w-24 rounded-xl" />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar Tabs */}
          <div className="flex flex-col gap-2">
            {tabs.map(i => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-[#121216]/40 border border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className="sk-dark h-5 w-5 rounded-full" />
                  <div className="sk-dark h-4 rounded-lg" style={{ width: `${60 + (i % 3) * 25}px` }} />
                </div>
                <div className="sk-dark h-5 w-6 rounded-full" />
              </div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Content card header */}
            <div className="bg-[#121216]/50 border border-white/[0.05] rounded-[32px] p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="sk-dark h-10 w-10 rounded-2xl" />
                <div className="flex flex-col gap-2">
                  <div className="sk-dark h-6 w-40 rounded-xl" />
                  <div className="sk-dark h-3 w-56 rounded-lg" />
                </div>
              </div>

              {/* Form fields grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile image block */}
                <div className="md:col-span-2 flex gap-4 items-start">
                  <div className="sk-dark w-24 h-24 rounded-2xl shrink-0" />
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="sk-dark h-11 w-full rounded-xl" />
                    <div className="sk-dark h-11 w-full rounded-xl" />
                  </div>
                </div>
                {/* Text fields */}
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="sk-dark h-3 w-24 rounded-full" />
                    <div className="sk-dark h-11 w-full rounded-xl" />
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-3 mt-8">
                <div className="sk-dark h-11 w-28 rounded-xl" />
                <div className="sk-dark h-11 w-32 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Route-Based Selector ───────────────────────────────────────── */
export default function SkeletonLoader() {
  const path = window.location.pathname;
  if (path === '/career')              return <CareerSkeleton />;
  if (path === '/research')            return <ResearchSkeleton />;
  if (path === '/research-papers')     return <ResearchPapersSkeleton />;
  if (path === '/patents')             return <PatentsSkeleton />;
  if (path === '/copyright')           return <CopyrightSkeleton />;
  if (path === '/certifications')      return <CertificationsSkeleton />;
  if (path === '/admin')               return <AdminDashboardSkeleton />;
  return <HomeSkeleton />;
}
