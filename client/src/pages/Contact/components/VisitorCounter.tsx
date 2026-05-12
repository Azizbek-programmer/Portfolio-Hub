import React, { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://xgvjzxpvlfupdakwldcc.supabase.co";
const SUPABASE_KEY = "sb_publishable_AvTn0I_P_shvnPORBiYEpg_5ITV3-mE";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem('contact_page_visited');
    
    const fetchCount = async () => {
      try {
        const { data, error } = await supabase
          .from('stats')
          .select('value')
          .eq('id', 'contact_views')
          .single();
        
        if (!error && data) {
          setCount(data.value);
        }
      } catch (err) {
        console.error("Sanoqni olishda xatolik:", err);
      }
    };

    const handleVisit = async () => {
      try {
        if (!hasVisited) {
          const { error } = await supabase.rpc('increment_visitor_count');
          if (!error) {
            localStorage.setItem('contact_page_visited', 'true');
          }
        }
        await fetchCount();
      } catch (err) {
        await fetchCount();
      }
    };

    handleVisit();

    const channel = supabase
      .channel('public:stats')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'stats', filter: "id=eq.contact_views" }, 
        payload => {
          setCount(payload.new.value);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/20 backdrop-blur-xl shadow-2xl"
    >
      <div className="relative flex h-2 w-2">
        <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></div>
        <div className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Visitors</span>
        <span className="text-sm font-bold text-white tabular-nums tracking-tight">
          {count !== null ? count.toLocaleString() : "..."}
        </span>
      </div>
    </motion.div>
  );
};

export default memo(VisitorCounter);
