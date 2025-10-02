import { MeetingGetOne } from "@/modules/meetings/types";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  BookOpenTextIcon,
  ClockFadingIcon,
  FileTextIcon,
  FileVideoIcon,
  SparklesIcon,
} from "lucide-react";

import Markdown from "react-markdown";
import Link from "next/link";
import { GeneratedAvatar } from "./generated-avatar";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import { formatDuration } from "@/lib/utils";
interface Props {
  data: MeetingGetOne;
}

export const CompletedState = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Tabs defaultValue="summary">
        <div className="bg-white rounded-lg border px-3">
          <ScrollArea>
            <TabsList className="p-0 justify-start rounded-none h-13">
              <TabsTrigger
                value="summary"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
              >
                <BookOpenTextIcon />
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="transcript"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
              >
                <FileTextIcon />
                Transcript
              </TabsTrigger>
              <TabsTrigger
                value="transcript"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
              >
                <FileTextIcon />
                Summary
              </TabsTrigger>

              <TabsTrigger
                value="recording"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
              >
                <FileVideoIcon />
                Recording
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
              >
                <SparklesIcon />
                Ask AI
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <TabsContent value="recording">
          <div className="bg-white rounded-lg border px-4 py-5">
            <video
              src={data.recordingUrl!}
              className="w-full rounded-lg"
              controls
            />
          </div>
        </TabsContent>
        <TabsContent value="summary">
          <div className="bg-white rounded-lg border px-4 py-5">
            <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
              <h2 className="text-2xl font-medium">{data.name}</h2>
              <div className="flex gap-x-2 items-center">
                <Link
                  href={`/agents/${data.agent.id}`}
                  className="flex items-center gap-x-2 underline underline-offset-4 capitalize"
                >
                  <GeneratedAvatar
                    variant="botttsNeutral"
                    className="size-5"
                    seed={data.agent.name}
                  />
                  {data.agent.name}
                </Link>
                <span className="text-muted-foreground">|</span>
                <p>{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>
              </div>
              <div className="flex gap-x-2 items-center">
                <SparklesIcon className="size-4" />
                <p>General Summary</p>
              </div>
              <Badge
                variant="outline"
                className="flex items-center gap-x-2 [&>svg]:size-4"
              >
                <ClockFadingIcon className="text-blue-500" />
                {data.duration ? formatDuration(data.duration) : "No Duration"}
                <div>
                  <Markdown
                    components={{
                      h1: (Props) => (
                        <h1
                          className="text-2xl font-semibold my-2"
                          {...Props}
                        />
                      ),
                      h2: (Props) => (
                        <h2 className="text-xl font-semibold my-2" {...Props} />
                      ),
                      h3: (Props) => (
                        <h3 className="text-lg font-semibold my-2" {...Props} />
                      ),
                      p: (Props) => <p className="my-2" {...Props} />,
                      a: (Props) => (
                        <a className="text-blue-500 underline" {...Props} />
                      ),
                      li: (Props) => (
                        <li className="ml-4 list-disc" {...Props} />
                      ),
                      ul: (Props) => <ul className="my-2" {...Props} />,
                      strong: (Props) => (
                        <strong className="font-semibold" {...Props} />
                      ),
                      em: (Props) => <em className="italic" {...Props} />,
                      code: (Props) => (
                        <code
                          className="bg-muted px-1 py-0.5 rounded font-mono"
                          {...Props}
                        />
                      ),
                    }}
                  >
                    {data.summary || "No Summary Available"}
                  </Markdown>
                </div>
              </Badge>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
