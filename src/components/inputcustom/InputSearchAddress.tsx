import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import InputCustomIcon, { InputCustomProps } from "./InputCustomIcon";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import "../../app/[locale]/style.css";
import { Transition } from "@headlessui/react";
import ProgressCircle from "../svg/ProgressCircle";
import { AddressComponent } from "@/lib/models/Address";
import { UseFormSetValue } from "react-hook-form";
const DELAY = 1000;
export interface InputSearchProps extends InputCustomProps {
  isOpen?: boolean;
  className?: string;
  align?: "center" | "end" | "start";
  side?: "top" | "right" | "bottom" | "left" | undefined;
  setValue: UseFormSetValue<any>;
  addressComponent: AddressComponent | undefined;
  setAddressComponent: Dispatch<SetStateAction<AddressComponent | undefined>>;
  value?: string;
}
export const InputSearchAddress = React.forwardRef<
  HTMLInputElement,
  InputSearchProps
>(
  (
    {
      className,
      setAddressComponent,
      addressComponent,
      setValue,
      value,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [listApi, setApi] = useState<AddressComponent[]>([]);
    const [valueInput, setValueInput] = useState<string>(value ?? "");
    const debounceRef = useRef<any>(null);

    function debounce<T extends (...arg: any[]) => void>(
      func: T,
      delay: number
    ) {
      return function (...args: Parameters<T>) {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
          func(...args);
          debounceRef.current = null;
        }, delay);
      };
    }

    async function fetchApi(term: string) {
      try {
        const response = await fetch(
          `/api/geocode?address=${encodeURIComponent(term)}`
        );
        const data = await response.json();
        const mappedAddress: AddressComponent[] = data.results.map(
          (result: any) => {
            const address: AddressComponent = {
              commune: result.compound.commune,
              district: result.compound.district,
              province: result.compound.province,
              name: result.name,
              address: result.address,
              formatted_address: result.formatted_address,
              location: {
                lat: result.geometry.location.lat,
                lng: result.geometry.location.lng,
              },
            };

            return address;
          }
        );
        setApi(mappedAddress);
      } catch (error) {
        console.error(error);
      }
    }

    const handleSearchAddress = async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      try {
        const newTerm = e.currentTarget.value;
        setValueInput(newTerm);
        if (newTerm.length > 0) {
          const funcDe = debounce(fetchApi, DELAY);
          funcDe(newTerm);
        } else {
          setApi([]);
        }
        if (listApi.length > 0 || newTerm.length > 0) {
          setIsOpen(true);
        }
      } catch (error) {
        console.error("Error fetching the API data:", error);
      }
    };
    return (
      <div>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger className="w-full">
            <InputCustomIcon
              ref={ref}
              {...props}
              className={className}
              value={valueInput}
              onChange={handleSearchAddress}
            />
          </PopoverTrigger>
          <PopoverContent
            className="PopoverContent"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <ScrollArea className="h-[200px]">
              {!debounceRef.current && listApi.length > 0
                ? listApi.map((item: AddressComponent, index: number) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-primary hover:text-accent outline-none rounded-md"
                      onClick={() => {
                        setAddressComponent(item);
                        setValueInput(item.formatted_address);
                        setValue("address", item.formatted_address);
                      }}
                    >
                      {item.formatted_address}
                    </div>
                  ))
                : null}
              {debounceRef.current && (
                <div className="h-[100px]">
                  <Transition
                    show={true}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0 scale-0"
                    leave="transition ease-in-out duration-300"
                    leaveTo="opacity-0 scale-0"
                  >
                    <div className="w-[30px] h-[50px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="flex flex-col items-center justify-center mb-20">
                        <ProgressCircle
                          className="w-[30px] h-[50px] text-primary"
                          aria-label="signing in"
                        />
                        <p>Loading......</p>
                      </div>
                    </div>
                  </Transition>
                </div>
              )}
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);
export default InputSearchAddress;
