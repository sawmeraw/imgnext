import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="w-full bg-white px-8 py-6 rounded-md overflow-hidden min-h-[1000px]">
        <h2 className="text-2xl mt-4 font-semibold">About</h2>
        <div className="mt-4">
          <div className="bg-slate-300 px-8 py-4 rounded-md">
            <p className="font-semibold text-xl">ImgNext</p>
            <p className="my-4">
              a web application built with Next.js and TypeScript that allows
              users to search for product images by entering specific product
              codes and color codes. This project leverages the power of Next.js
              for server-side rendering and fast client-side navigation,
              providing a smooth user experience.
            </p>
            <ul>
              <li className="mt-4">Dependencies:</li>
              <ul className="list-disc ml-8">
                <li className="mt-4">
                  jszip - ZIP file creation and manipulation
                </li>
                <li className="mt-4">next - Next.js framework</li>
                <li className="mt-4">react - React library</li>
                <li className="mt-4">
                  react-dom - React library for DOM rendering
                </li>
                <li className="mt-4">react-icons - SVG icons for React</li>
                <li className="mt-4">
                  react-toastify - Toast notifications for React
                </li>
                <li className="mt-4">uuid - Generate unique IDs</li>
                <li className="mt-4">zustand - State management for React</li>
              </ul>
            </ul>

            <p className="mt-4">
              The previous version of the project is still up and running{" "}
              <a
                className="font-semibold hover:underline hover:text-blue-600 duration-200"
                href="https://image-fetcher-express-2jhi.vercel.app/"
              >
                here
              </a>
              .
            </p>

            <p className="mt-4">
              This project was developed with the need for a better developed
              tool than previous version. Code efficiency, testing,
              maintainability and scalability were the main focus of this
              project. Error handling was also improved to provide better user
              experience. Features like cargo, multiple download options and a
              better UI are meant for a better UX.
            </p>
            <p className="mt-4">
              The source code for this project is available on{" "}
              <span>
                <Link
                  target="_blank"
                  className="font-semibold text-lg hover:underline"
                  href="https://github.com/sawmeraw/imgnext"
                >
                  Github
                </Link>
                .
              </span>
            </p>

            <p className="mt-16 text-center">
              Developed with sleepy eyes by <strong>Sameer</strong>{" "}
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
