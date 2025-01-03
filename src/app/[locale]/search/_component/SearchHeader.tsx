import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils/dates";
import { BellIcon } from "lucide-react";

export function SearchHeader({
  workCount,
  location,
}: {
  workCount: number;
  location: string | null;
}) {
  console.log(location);
  return (
    <div className="w-[75%] gap-3 mx-auto px-4 py-1">
      <div className="flex justify-between">
        <div className="space-y-3">
          {location && (
            <div className="text-sm">
              Địa điểm tìm kiếm:{" "}
              <Badge className="bg-primary">{location}</Badge>
            </div>
          )}
          <p className="text-sm font-bold">
            Tuyển dụng {workCount > 0 ? workCount : null} việc làm {location}{" "}
            [Update {formatDate(new Date())}]
          </p>
        </div>
        <div className="flex items-end">
          <Button className="flex items-center gap-2" variant="outlineVariant">
            <BellIcon className="w-5 h-5" />
            <span>Tạo thông báo việc làm</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
