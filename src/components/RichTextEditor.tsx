import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useEffect } from 'react';
import "../styles/RichTextEditor.css";

interface RichTextEditorProps {
    content: string;
    onUpdate: (content: string) => void;
    placeholder?: string;
}

const RichTextEditor = ({
    content,
    onUpdate,
    placeholder = 'Escribe tu contenido aquí...'
}: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Image,
            Link.configure({
                openOnClick: false,
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onUpdate(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none p-4',
            },
        },
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    return (
        <div className="rich-text-editor">
            <MenuBar editor={editor} />
            <EditorContent
                editor={editor}
                className="editor-content"
                placeholder={placeholder}
            />
        </div>
    );
};

const MenuBar = ({ editor }: { editor: ReturnType<typeof useEditor> }) => {
    if (!editor) return null;

    return (
        <div className="editor-menu-bar">
            {/* Grupo de formato de texto */}
            <div className="editor-button-group">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`editor-menu-button ${editor.isActive('bold') ? 'active' : ''}`}
                    aria-label="Negrita"
                >
                    <strong>B</strong>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`editor-menu-button ${editor.isActive('italic') ? 'active' : ''}`}
                    aria-label="Itálica"
                >
                    <em>I</em>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`editor-menu-button ${editor.isActive('underline') ? 'active' : ''}`}
                    aria-label="Subrayado"
                >
                    <u>U</u>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`editor-menu-button ${editor.isActive('strike') ? 'active' : ''}`}
                    aria-label="Tachado"
                >
                    <s>S</s>
                </button>
            </div>

            <div className="editor-separator"></div>

            {/* Selector de encabezados */}
            <select
                value={editor.getAttributes('heading').level || '0'}
                onChange={(e) => {
                    const value = e.target.value;
                    if (value === '0') {
                        editor.chain().focus().setParagraph().run();
                    } else {
                        editor.chain().focus().toggleHeading({
                            level: parseInt(value) as 1 | 2 | 3
                        }).run();
                    }
                }}
                className="editor-heading-select"
            >
                <option value="0">Párrafo</option>
                <option value="1">Título 1</option>
                <option value="2">Título 2</option>
                <option value="3">Título 3</option>
            </select>

            <div className="editor-separator"></div>

            {/* Grupo de listas */}
            <div className="editor-button-group">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`editor-menu-button editor-list-button ${editor.isActive('bulletList') ? 'active' : ''}`}
                    aria-label="Lista con viñetas"
                >
                    • Lista
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`editor-menu-button editor-list-button ${editor.isActive('orderedList') ? 'active' : ''}`}
                    aria-label="Lista numerada"
                >
                    1. Lista
                </button>
            </div>

            <div className="editor-separator"></div>

            {/* Botones especiales */}
            <button
                type="button"
                onClick={() => {
                    const previousUrl = editor.getAttributes('link').href;
                    const url = window.prompt('URL del enlace', previousUrl);

                    if (url === null) return;
                    if (url === '') {
                        editor.chain().focus().extendMarkRange('link').unsetLink().run();
                        return;
                    }

                    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                }}
                className={`editor-menu-button editor-menu-button-special ${editor.isActive('link') ? 'active' : ''}`}
                aria-label="Insertar enlace"
            >
                Enlace
            </button>

            <button
                type="button"
                onClick={() => {
                    const url = window.prompt('URL de la imagen');

                    if (url) {
                        editor.chain().focus().setImage({ src: url }).run();
                    }
                }}
                className="editor-menu-button editor-menu-button-special editor-image-button"
                aria-label="Insertar imagen"
            >
                Imagen
            </button>
        </div>
    );
};

export default RichTextEditor;