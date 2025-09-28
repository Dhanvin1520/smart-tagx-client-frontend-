import React from 'react';
import { CheckSquare, Square, Pencil, X as Close, Link as LinkIcon } from 'lucide-react';

interface TagChipProps {
  tag: string;
  isSelected?: boolean;
  onToggle?: (tag: string) => void;
  showCheckbox?: boolean;
  editable?: boolean;
  onEdit?: (oldTag: string, newTag: string) => void;
  onRemove?: (tag: string) => void;
  href?: string;
  onEditLink?: (tag: string, url: string) => void;
}

export const TagChip: React.FC<TagChipProps> = ({ 
  tag, 
  isSelected = false, 
  onToggle, 
  showCheckbox = false,
  editable = false,
  onEdit,
  onRemove,
  href,
  onEditLink
}) => {
  const getTagStyle = (tag: string) => {
    if (tag.startsWith('::Topic/')) {
      return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200';
    } else if (tag.startsWith('::Person/') || tag.startsWith('@Person/')) {
      return 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200';
    } else if (tag.startsWith('/Company/')) {
      return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
    } else if (tag.startsWith(':Product/')) {
      return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
    } else if (tag.startsWith('//Location/')) {
      return 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200';
    } else if (tag.startsWith('//')) {
      return 'bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200';
    } else if (tag.startsWith('<Type/')) {
      return 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200';
    } else if (tag.startsWith('^Length/')) {
      return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
    }
    return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
  };

  const getTagIcon = (tag: string) => {
    if (tag.startsWith('::Topic/')) return '🎯';
    if (tag.startsWith('::Person/') || tag.startsWith('@Person/')) return '👤';
    if (tag.startsWith('/Company/')) return '🏢';
    if (tag.startsWith(':Product/')) return '📦';
    if (tag.startsWith('//Location/')) return '📍';
    if (tag.startsWith('//')) return '💭';
    if (tag.startsWith('<Type/')) return '📄';
    if (tag.startsWith('^Length/')) return '📏';
    return '🏷️';
  };

  const handleClick = () => {
    if (onToggle) {
      onToggle(tag);
    }
  };

  return (
    <div 
      className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-300 ${
        getTagStyle(tag)
      } ${
        showCheckbox ? 'cursor-pointer hover:shadow-lg transform hover:scale-105' : ''
      } ${
        isSelected ? 'ring-2 ring-blue-500 shadow-xl scale-105' : ''
      }`}
      onClick={showCheckbox ? handleClick : undefined}
    >
      {showCheckbox && (
        <div className="flex-shrink-0">
          {isSelected ? (
            <CheckSquare className="w-4 h-4 text-blue-600" />
          ) : (
            <Square className="w-4 h-4 text-gray-400" />
          )}
        </div>
      )}
      <span className="text-lg">{getTagIcon(tag)}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline decoration-dotted underline-offset-2 hover:decoration-solid"
          onClick={(e) => showCheckbox && e.stopPropagation()}
          title={href}
        >
          {tag}
        </a>
      ) : (
        <span className="font-bold">{tag}</span>
      )}
      {editable && (
        <div className="flex items-center gap-1 ml-2">
          {onEdit && (
            <button
              type="button"
              className="p-1 rounded hover:bg-white/60"
              onClick={(e) => {
                e.stopPropagation();
                const updated = window.prompt('Edit tag', tag);
                if (updated && updated.trim() && updated !== tag) {
                  onEdit(tag, updated.trim());
                }
              }}
              title="Edit tag"
            >
              <Pencil className="w-4 h-4 text-slate-600" />
            </button>
          )}
          {onEditLink && (
            <button
              type="button"
              className="p-1 rounded hover:bg-white/60"
              onClick={(e) => {
                e.stopPropagation();
                const current = href || '';
                const updated = window.prompt('Set link URL for this tag', current);
                if (updated !== null) {
                  const u = updated.trim();
                  if (u) onEditLink(tag, u);
                }
              }}
              title="Set link URL"
            >
              <LinkIcon className="w-4 h-4 text-slate-600" />
            </button>
          )}
          {onRemove && (
            <button
              type="button"
              className="p-1 rounded hover:bg-white/60"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(tag);
              }}
              title="Remove tag"
            >
              <Close className="w-4 h-4 text-slate-600" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};