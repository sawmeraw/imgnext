export default function Note() {
  return (
    <>
      <div className="w-full mt-4 bg-white px-4 py-2 rounded-md overflow-hidden">
        <h2 className="text-2xl mt-4 font-semibold">Tips</h2>
        <div className="mt-4">
          <p>
            The tool works by getting the product code and color code for
            products. For NewBalance, the color code doesn&apos;t matter. In case of any unavailable URLs, you will be notified.
          </p>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-semibold">Ways to Download</h3>
          <ul className="list-disc list-inside">
            <li className="mt-4">
              Images can be hovered over to download individually.
            </li>
            <li className="mt-4">
              The set displayed on the preview can be downloaded as a zip file
              using the download button on the Preview.
            </li>
            <li className="mt-4 mb-4">
              Images can be added to the cargo (not a cart!!!) and downloaded later as a whole.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
