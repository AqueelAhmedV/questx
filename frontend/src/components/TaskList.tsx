//@ts-nocheck
import { Card, Typography } from "@material-tailwind/react";
import { useMemo } from "react";

function incrementDate(dateString, daysToAdd) {
    var parts = dateString.split('-');
    var currentDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    currentDate.setDate(currentDate.getDate() + daysToAdd);

    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();

    // Padding month and day with leading zeros if necessary
    month = (month < 10 ? '0' : '') + month;
    day = (day < 10 ? '0' : '') + day;

    return year + '-' + month + '-' + day;
}

const TaskList = ({ list, onListClick, startDate, day }) => {
    console.log(startDate)
    const ItemCards = useMemo(() => {
        if (!startDate) return []
        return list.map((item: ExperienceInfo) => {
                return (
                    <Card className="p-4 cursor-pointer" key={item.exp_id} color="transparent" shadow
                        onClick={() => onListClick(item)}
                    >
                        <div className="flex justify-between">
                            <Typography className="font-semibold text-md">
                                {item.exp_title}
                            </Typography>
                            {
                                item.type === "hotel" ? null : (
                                    <Typography className="text-gray-400">
                                        {`${item.exp_start_time}:00 - ${item.exp_end_time}:00`}
                                    </Typography>
                                )
                            }

                        </div>

                        <Typography className="text-sm">
                            {item.exp_description}
                        </Typography>
                    </Card>
                );
            })
    }, [list, onListClick, startDate, day]);

    return (
        <div className=" pb-2 max-h-[50vh] overflow-y-auto">
            {ItemCards}
        </div>
    )
}

export default TaskList;