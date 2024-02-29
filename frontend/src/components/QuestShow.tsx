//@ts-nocheck
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

const QuestShow = (data, open, handleOpen)=>{
    return(
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>{data.quest_title}</DialogHeader>
                <DialogBody>
                    {data.quest_description}
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={()=>handleOpen(false)}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default QuestShow;