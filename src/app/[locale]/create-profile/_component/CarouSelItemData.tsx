import AvataUser from "@/components/AvatarUset";
import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import { Star, Briefcase } from "lucide-react"; // Icon rating và job

function CarouSelItemData({ freelancer }: { freelancer: any }) {
    return (
        <CarouselItem className="">
            <Card>
                <CardContent className="flex aspect-square flex-col items-center justify-center  rounded-xl p-6 shadow-md bg-white text-center">
                    <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                        <AvataUser />

                        {freelancer.isOnline && (
                            <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}

                        {freelancer.isTopRated && (
                            <div className="absolute bottom-0 right-0 bg-pink-500 text-white text-xs px-1 py-0.5 rounded-full">
                                ★
                            </div>
                        )}
                    </div>

                    <h3 className="text-lg font-semibold mt-3">{freelancer.name}</h3>
                    <p className="text-gray-500 text-sm">{freelancer.title}</p>

                    <div className="flex justify-center items-center gap-3 mt-2">
                        <div className="flex items-center text-pink-500">
                            <Star className="w-4 h-4" />
                            <span className="ml-1">{freelancer.rating}</span>
                        </div>
                        <span>${freelancer.hourlyRate}/hr</span>
                        <div className="flex items-center">
                            <Briefcase className="w-4 h-4" />
                            <span className="ml-1">{freelancer.jobsCompleted} jobs</span>
                        </div>
                    </div>

                    <p className="mt-3 text-gray-700 italic">{`"${freelancer.review}"`}</p>
                </CardContent>
            </Card>
        </CarouselItem>
    );
}

export default CarouSelItemData;
