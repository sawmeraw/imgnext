import SingleImage from "./SingleImage";
import { SearchFormProps } from "@/types/SearchTypes";
import FetchImages from "@/app/search/fetchImages";
import { v4 as uuid } from "uuid";
import { useState, useEffect} from "react";

export default function ExampleImages() {

  const exampleUrls = [
    "https://res.cloudinary.com/dr9fn4qkg/image/upload/w_1367/brooks-images/product-img/110437_423_l_wr.png",
    "https://s7d4.scene7.com/is/image/WolverineWorldWide/S20939-45_1?$dw-pdp-primary$",
    "https://nb.scene7.com/is/image/NB/mrcxca4_nb_02_i?$dw_detail_main_lg$&bgc=f1f1f1&layer=1&bgcolor=ffffff&blendMode=mult&scale=10&wid=1600&hei=1600"
  ]
  return (
    <>
      <div className="flex flex-col">
        <p className="text-md text-center">Example images</p>
        <div className="flex mt-4 gap-4">
          {exampleUrls.map((image, index) => {
            
            return (
              <SingleImage
                key={index}
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
