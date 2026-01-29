
import React, { useState } from 'react';
import { Comment } from '../types';
import { INITIAL_COMMENTS } from '../constants';
import { getAICommentResponse } from '../services/geminiService';
import { Lang, translations } from '../translations';

interface GuestbookProps {
  lang: Lang;
}

const Guestbook: React.FC<GuestbookProps> = ({ lang }) => {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiReplies, setAiReplies] = useState<Record<string, string>>({});

  const t = translations[lang].guestbook;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim()) return;

    setIsSubmitting(true);
    const commentId = Date.now().toString();
    const commentObj: Comment = {
      id: commentId,
      author: name,
      content: newComment,
      timestamp: new Date(),
      avatar: `https://picsum.photos/seed/${name}/100/100`
    };

    setComments([commentObj, ...comments]);
    setNewComment('');
    setName('');

    const reply = await getAICommentResponse(newComment, lang);
    setAiReplies(prev => ({ ...prev, [commentId]: reply }));
    setIsSubmitting(false);
  };

  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-outfit font-bold text-white mb-4 tracking-tight">{t.title}</h2>
        <p className="text-slate-500 font-light tracking-wide">{t.desc}</p>
      </div>

      <form onSubmit={handleSubmit} className="mb-24 space-y-6">
        <input
          type="text"
          placeholder={t.namePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent transition-all text-sm font-light"
          required
        />
        <textarea
          placeholder={t.msgPlaceholder}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 text-white focus:outline-none focus:border-accent transition-all min-h-[140px] text-sm font-light"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent text-white font-bold py-5 rounded-2xl hover:bg-accent/80 transition-all disabled:opacity-50 flex justify-center items-center uppercase tracking-[0.2em] text-[10px]"
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : t.post}
        </button>
      </form>

      <div className="space-y-16">
        {comments.map((c) => (
          <div key={c.id} className="group animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex gap-8">
              <img src={c.avatar} alt={c.author} className="w-14 h-14 rounded-2xl opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="flex-grow">
                <div className="flex items-center gap-4 mb-3">
                  <span className="font-bold text-white tracking-tight">{c.author}</span>
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{c.timestamp.toLocaleDateString()}</span>
                </div>
                <p className="text-slate-400 font-light leading-relaxed mb-6 italic">
                  "{c.content}"
                </p>
                
                {aiReplies[c.id] && (
                  <div className="mt-4 border-l-2 border-accent/20 pl-8 py-2 animate-in slide-in-from-left-4 duration-500">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                      <span className="text-[9px] font-bold text-accent uppercase tracking-widest">{t.aiResponse}</span>
                    </div>
                    <p className="text-slate-500 text-sm font-light leading-relaxed">
                      {aiReplies[c.id]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guestbook;
