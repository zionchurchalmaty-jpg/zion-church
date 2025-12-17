export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/church-family-community.png"
              alt="Church community gathering"
              className="w-full h-full object-cover"
            />
            <p className="mt-4 text-sm text-gray-700 text-center">
              Our church family
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                About Us
              </span>
            </div>

            <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy text-balance">
              Serving the Slavic Community in Northern Virginia
            </h2>

            <div className="space-y-4 text-lg leading-relaxed text-gray-700">
              <p>
                We are a family of believers from Russia, Ukraine, the former
                Soviet Union, and America — united by faith in Jesus Christ. Our
                bilingual services in Russian and English welcome immigrants,
                their families, and all who seek authentic community, spiritual
                growth, and opportunities to serve together.
              </p>
              <p>
                Whether you're a new immigrant or have called this area home for
                years, you'll find a warm, welcoming community ready to embrace
                you and walk alongside you in your faith journey.
              </p>
            </div>

            <div className="bg-cream border-l-4 border-primary p-6 rounded-lg">
              <p className="font-serif text-xl text-navy font-medium italic">
                "Bring God's Joy to All People"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
