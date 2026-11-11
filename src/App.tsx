import { useEffect, useState } from 'react';
import { Hero } from '@/sections/Hero';
import { ChildInfoCard, type ChildInfo } from '@/sections/ChildInfoCard';
import { AssessmentSection } from '@/sections/AssessmentSection';
import { Results } from '@/sections/Results';
import { Conclusion, type Notes } from '@/sections/Conclusion';
import { Footer } from '@/sections/Footer';
import { ProgressRail } from '@/components/ProgressRail';
import { SECTIONS } from '@/data';

type Answers = Record<string, number | undefined>;

const STORAGE_KEY = 'logoritmika-v1';

interface Persisted {
  answers: Answers;
  info: ChildInfo;
  notes: Notes;
}

const DEFAULT_INFO: ChildInfo = { name: '', age: '', date: '', teacher: 'Ирина Сергеевна Кичигина' };
const DEFAULT_NOTES: Notes = { strengths: '', zones: '' };

function loadPersisted(): Persisted {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Persisted>;
      return {
        answers: parsed.answers ?? {},
        info: { ...DEFAULT_INFO, ...parsed.info },
        notes: { ...DEFAULT_NOTES, ...parsed.notes },
      };
    }
  } catch {
    /* localStorage недоступен — работаем без сохранения */
  }
  return { answers: {}, info: DEFAULT_INFO, notes: DEFAULT_NOTES };
}

export default function App() {
  const [state, setState] = useState<Persisted>(loadPersisted);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const handleSelect = (skillId: string, value: number) =>
    setState((s) => ({ ...s, answers: { ...s.answers, [skillId]: value } }));

  const handleReset = () =>
    setState({ answers: {}, info: DEFAULT_INFO, notes: DEFAULT_NOTES });

  return (
    <div id="top" className="min-h-[100dvh]">
      <ProgressRail answers={state.answers} />
      <Hero />
      <main id="main">
        <ChildInfoCard
          info={state.info}
          onChange={(info) => setState((s) => ({ ...s, info }))}
        />
        {SECTIONS.map((sec) => (
          <AssessmentSection
            key={sec.id}
            section={sec}
            answers={state.answers}
            onSelect={handleSelect}
          />
        ))}
        <Results answers={state.answers} />
        <Conclusion
          notes={state.notes}
          onChange={(notes) => setState((s) => ({ ...s, notes }))}
        />
      </main>
      <Footer onReset={handleReset} />
    </div>
  );
}
