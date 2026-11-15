'use client';

import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link2,
  Unlink,
  Undo,
  Redo,
  Minus,
} from 'lucide-react';
import CustomConfirmDialog from '@/components/ui/CustomConfirmDialog';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Write field narrative, article body, or essay paragraphs...',
  minHeight = 'min-h-[180px]',
}: RichTextEditorProps) {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'underline underline-offset-2 text-foreground font-medium hover:text-muted',
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: `${minHeight} p-4 bg-background border border-t-0 border-border text-foreground text-xs sm:text-sm focus:outline-hidden leading-relaxed prose prose-neutral max-w-none`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className={`${minHeight} p-4 bg-background border border-border text-xs text-muted flex items-center justify-center`}>
        Loading Rich Text Studio Editor...
      </div>
    );
  }

  const handleOpenLinkDialog = () => {
    const previousUrl = editor.getAttributes('link').href || '';
    setLinkUrl(previousUrl);
    setIsLinkDialogOpen(true);
  };

  const handleSetLink = () => {
    if (linkUrl.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl.trim(), target: '_blank' })
        .run();
    }
    setIsLinkDialogOpen(false);
  };

  return (
    <div className="w-full border border-border rounded-none overflow-hidden bg-card font-sans">
      {/* Editor Top Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-secondary/70 border-b border-border text-foreground">
        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 transition-colors cursor-pointer rounded-none ${
            editor.isActive('bold')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-card text-muted hover:text-foreground'
          }`}
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 transition-colors cursor-pointer rounded-none ${
            editor.isActive('italic')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-card text-muted hover:text-foreground'
          }`}
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-4 bg-border mx-1" />

        {/* Heading 2 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 transition-colors cursor-pointer rounded-none ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-card text-muted hover:text-foreground'
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-3.5 h-3.5" />
        </button>

        {/* Heading 3 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 transition-colors cursor-pointer rounded-none ${
            editor.isActive('heading', { level: 3 })
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-card text-muted hover:text-foreground'
          }`}
          title="Heading 3"
        >
          <Heading3 className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-4 bg-border mx-1" />

        {/* Bullet List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 transition-colors cursor-pointer rounded-none ${
            editor.isActive('bulletList')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-card text-muted hover:text-foreground'
          }`}
          title="Bullet List (ul)"
        >
          <List className="w-3.5 h-3.5" />
        </button>

        {/* Ordered List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 transition-colors cursor-pointer rounded-none ${
            editor.isActive('orderedList')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-card text-muted hover:text-foreground'
          }`}
          title="Numbered List (ol)"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        {/* Blockquote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 transition-colors cursor-pointer rounded-none ${
            editor.isActive('blockquote')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-card text-muted hover:text-foreground'
          }`}
          title="Blockquote"
        >
          <Quote className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-4 bg-border mx-1" />

        {/* Add Link */}
        <button
          type="button"
          onClick={handleOpenLinkDialog}
          className={`p-1.5 transition-colors cursor-pointer rounded-none ${
            editor.isActive('link')
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-card text-muted hover:text-foreground'
          }`}
          title="Insert / Edit Link"
        >
          <Link2 className="w-3.5 h-3.5" />
        </button>

        {/* Unlink */}
        {editor.isActive('link') && (
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetLink().run()}
            className="p-1.5 hover:bg-card text-muted hover:text-foreground transition-colors cursor-pointer rounded-none"
            title="Remove Link"
          >
            <Unlink className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Divider Rule */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-1.5 hover:bg-card text-muted hover:text-foreground transition-colors cursor-pointer rounded-none"
          title="Horizontal Rule"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-4 bg-border mx-1 ml-auto" />

        {/* Undo / Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1.5 hover:bg-card text-muted hover:text-foreground transition-colors cursor-pointer rounded-none disabled:opacity-30 disabled:cursor-not-allowed"
          title="Undo (Ctrl+Z)"
        >
          <Undo className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1.5 hover:bg-card text-muted hover:text-foreground transition-colors cursor-pointer rounded-none disabled:opacity-30 disabled:cursor-not-allowed"
          title="Redo (Ctrl+Y)"
        >
          <Redo className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Actual Content Editor Viewport */}
      <EditorContent editor={editor} />

      {/* Custom Link Insertion Modal (Zero native prompt / alert) */}
      {isLinkDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-sm bg-card border border-border p-5 rounded-none shadow-xl space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Insert Hyperlink
            </h4>
            <div>
              <label className="block text-[11px] text-muted mb-1">Target URL (https://...)</label>
              <input
                type="url"
                autoFocus
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSetLink();
                  }
                  if (e.key === 'Escape') {
                    setIsLinkDialogOpen(false);
                  }
                }}
                className="w-full px-3 py-2 text-xs bg-background border border-border text-foreground rounded-none focus:outline-hidden focus:border-foreground"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => setIsLinkDialogOpen(false)}
                className="px-3 py-1.5 text-xs text-muted hover:text-foreground border border-border cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSetLink}
                className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Apply Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
