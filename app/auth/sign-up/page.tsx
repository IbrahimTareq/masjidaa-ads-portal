import SignUpForm from "@/components/sign-up-form";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-svh w-full flex items-center justify-center relative p-6 md:p-10">
      <div className="absolute inset-0 bg-[url('/pattern.jpg')] bg-repeat opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/80 via-green-50/60 to-green-100/50"></div>
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row border border-gray-200 text-black overflow-hidden z-10">
        {/* Left Column - Instructions */}
        <div className="w-full md:w-2/5 pr-0 md:pr-6 mb-8 md:mb-0">
          <div className="flex items-center justify-center md:justify-start mb-3">
            <Image
              src="https://images.masjidaa.com/assets/brand/logo-primary.svg"
              alt="Masjidaa"
              className="w-16 h-16 object-contain"
              width={64}
              height={64}
            />
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
            Masjidaa Ads Portal
          </h2>

          <div className="space-y-4 text-gray-700">
            <p className="text-sm">
              Businesses can reach local communities by displaying ads in
              trusted, high-traffic masjids. You can promote your services in a
              meaningful setting where your message matters. Easily manage and
              run your ads across our growing network of masjids.
            </p>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px bg-gray-200 mx-4"></div>

        {/* Right Column - Form */}
        <div className="w-full md:w-3/5 md:pl-6">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
