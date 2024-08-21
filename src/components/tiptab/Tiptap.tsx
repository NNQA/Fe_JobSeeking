"use client";

import { cn } from "@/lib/utils";
import {
  useEditor,
  EditorContent,
  HTMLContent,
  JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Blockquote from "@tiptap/extension-blockquote";
import ListItem from "@tiptap/extension-list-item";
import EditToolBar from "./tool/edit-toolbar";
interface EditorProps {
  content: HTMLContent | JSONContent | JSONContent[] | null;
  placeholder?: string;
  onChange: (value: string) => void;
  classNameContent?: string;
}

const extensions = [StarterKit, Blockquote, ListItem];
const Tiptap = ({
  content,
  placeholder,
  onChange,
  classNameContent,
}: EditorProps) => {
  const editor = useEditor({
    extensions: extensions,
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const cleanedHtml = html.replace(/<p><\/p>/g, "").trim();
      onChange(cleanedHtml);
    },
  });
  if (!editor) return <></>;
  return (
    <div className="border border-input bg-background">
      <EditToolBar editor={editor} />
      <div className="px-5 py-4">
        <EditorContent
          editor={editor}
          className={cn("focus:outline-none", classNameContent)}
          style={{ outline: "none" }}
        />
      </div>
    </div>
  );
};

export default Tiptap;
