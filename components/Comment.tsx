import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  CircularProgress,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getComments, Comment } from "../pages/api";

export default function Comments(params: { postId: number }) {
  const { postId } = params;
  const [comments, setComments] = useState<Comment[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      const res = await getComments(postId);
      setComments(res);
      setLoading(false);
    }
    fetchComments();
  }, []);

  return (
    <Accordion disabled={comments?.length === 0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="comments"
        id={`${postId}-headeer`}
      >
        {loading && <CircularProgress />}
        {!loading && <>Comments ({comments?.length})</>}
      </AccordionSummary>
      <AccordionDetails>
        {comments?.map((comment) => (
          <>
            <p key={comment.id}>{comment.body}</p>
            <Divider />
          </>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
