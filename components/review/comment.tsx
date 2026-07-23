"use client";

import { Activity, useState } from "react";

export default function Comment({ comment }: { comment: string }) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isCommentLong = comment.length > 59;

  return (
    <div className="space-y-1">
      <p
        className={`text-muted-foreground mt-2 text-sm leading-relaxed text-pretty ${!isExpanded && "line-clamp-1"}`}>
        {comment}
      </p>

      <Activity mode={isCommentLong ? "visible" : "hidden"}>
        <button
          className="text-foreground cursor-pointer hover:underline"
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      </Activity>
    </div>
  );
}
