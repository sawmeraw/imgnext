import SingleImage from "./SingleImage";
import { SearchFormProps } from "@/types/SearchTypes";
import FetchImages from "@/utils/FetchImages";
import { v4 as uuid } from "uuid";

export default function ExampleImages() {
  const imageSearchData: SearchFormProps[] = [
    {
      brand: "asicsftwr",
      productCode: "1013A150",
      colorCode: "750",
    },
    {
      brand: "hoka",
      productCode: "1127952",
      colorCode: "FTRS",
    },
    {
      brand: "saucony",
      productCode: "S20939",
      colorCode: "129",
    },
    {
      brand: "newbalance",
      productCode: "M1080K13",
      colorCode: "",
    },
  ];

  return (
    <>
      <div className="flex flex-col">
        <p className="text-md text-center">Example images</p>
        <div className="flex mt-4 gap-4">
          {imageSearchData.map((data) => {
            const imageUrls = FetchImages(data);
            const image = imageUrls[0];
            return (
              <SingleImage
                key={uuid()}
                url={image}
                alt="Example Image"
                id={uuid()}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
