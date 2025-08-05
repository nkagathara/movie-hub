import React from "react";
import { Card, CardContent } from "../../components/ui/card";

export const NoPoster = (): JSX.Element => {
  return (
    <div className="bg-[#2c2948] flex flex-row justify-center w-full">
      <Card className="bg-[#2c2948] w-[500px] h-[346.59px] border-none">
        <CardContent className="flex items-center justify-center h-full p-0">
          <h1 className="font-sans font-bold text-white text-[40px] text-center tracking-[0] leading-10">
            Poster Not Available
          </h1>
        </CardContent>
      </Card>
    </div>
  );
};
