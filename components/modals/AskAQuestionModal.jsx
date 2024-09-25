"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import axios from "axios";
import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AskAQuestionModal({ product,config }) {
   const [question, setquestion] = useState("");
  const handleSubmit = async (productId) => {
   
    try {
       const response = await axios.post(
         `${process.env.NEXT_PUBLIC_API_URL}/question/product/${productId}/question`, {
           question
         },
         config
       );
      // Your logic here
      toast.success("Question submitted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit question");
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <button className="w-fit flex items-center gap-1 bg-black group text-gray-300 py-2 pl-5 pr-4">
          <QuestionMarkCircleIcon className="h-5 w-5" />
          Ask a question
          <ChevronRightIcon className="h-5 w-0 group-hover:w-5 transition-all ease-in duration-150" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ask a question</DialogTitle>
          <DialogDescription>
            Ask anything you want to know about this product.
          </DialogDescription>
          <div className="pt-5">
            <input
              value={question}
              onChange={(e) => setquestion(e.target.value)}
              placeholder="Type your question ..."
              className="w-full py-2 px-3 focus:outline-none border border-black/10 rounded-md"
            />
          </div>
          <div className="flex items-center pt-5 gap-1">
            <DialogClose asChild>
              <button
                onClick={() => handleSubmit(product._id)}
                className="w-fit flex items-center gap-1 bg-green-600 group text-white py-2 font-light pl-5 pr-4"
              >
                Submit
                <ChevronRightIcon className="h-5 w-0 group-hover:w-5 transition-all ease-in duration-150" />
              </button>
            </DialogClose>
            <DialogClose asChild>
              <button className="w-fit flex items-center gap-1 bg-gray-400 group text-white py-2 font-light pl-5 pr-4">
                Cancel
                <ChevronRightIcon className="h-5 w-0 group-hover:w-5 transition-all ease-in duration-150" />
              </button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
