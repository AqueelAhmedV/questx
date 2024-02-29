//@ts-nocheck
import { Card, Typography } from "@material-tailwind/react";


const TaskList = ({list, onListClick})=>{
    const ItemCards = list.map((item)=>{
        return (
            <Card className="p-2" key={item.id} color="transparent" shadow 
                onClick={()=>onListClick(item)}
            >
                <div className="flex justify-between">
                    <Typography>
                        {item.title}
                    </Typography>
                    {
                        item.type==="hotel" ? null : (
                            <Typography>
                                {`${item.startTime}:00 - ${item.endTime}:00`}
                            </Typography>
                        )
                    }
                    
                </div>
                
                <Typography>
                    {item.desc}
                </Typography>
            </Card>
        );
    }   
    );

    return (
        <div className=" pb-2 max-h-[50vh] overflow-y-scroll">
            {ItemCards}
        </div>
    )
}

export default TaskList;