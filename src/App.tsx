import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowRight, BarChart3, BookOpen, Brain, CheckCircle2, ChevronLeft, ChevronRight,
  CircleHelp, Clock3, Home, LayoutDashboard, LogIn, Menu, Moon, Play, RotateCcw,
  Search, Settings, ShieldCheck, Sparkles, Target, TrendingUp, User, X, Zap
} from 'lucide-react'
import { questions } from './data/questions'
import { topics } from './data/topics'
import type { Attempt, Difficulty, Question, TopicId } from './types'
import { clearUser, getAttempts, saveAttempt } from './lib/storage'
import { supabase } from './lib/supabase'

const topicName = (id: string) => topics.find(t => t.id === id)?.name || 'All Topics'
const pct = (n: number, d: number) => d ? Math.round(n / d * 100) : 0

function Shell({children}: {children: React.ReactNode}) {
  const [open, setOpen] = useState(false)
  const [authUser, setAuthUser] = useState<any>(null)

  const nav = [
    ['/', 'Dashboard', LayoutDashboard],
    ['/practice', 'Practice Quiz', Play],
    ['/topics', 'Topics', BookOpen],
    ['/progress', 'Progress', BarChart3],
    ['/review', 'Review Mistakes', RotateCcw],
    ['/recovery', 'Smart Recovery', Zap],
    ['/study-buddy', 'AI Study Buddy', Sparkles],
    ['/profile', 'Profile', User],
    ['/settings', 'Settings', Settings],
  ] as const

  const loc = useLocation()

  useEffect(() => {
    if (!supabase) return

    supabase.auth.getUser().then(({ data }) => {
      setAuthUser(data.user ?? null)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const displayName =
    authUser?.user_metadata?.name ||
    authUser?.email?.split('@')[0] ||
    'Learner'

  const displayEmail =
    authUser?.email ||
    ''

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-mark">A</div>
          <div>
            <b>AZ-900 Ready</b>
            <small>Unofficial study tool</small>
          </div>
        </div>

        <nav>
          {nav.map(([to, label, Icon]) => (
            <Link
              key={to}
              className={loc.pathname === to ? 'active' : ''}
              to={to}
              onClick={() => setOpen(false)}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-note">
          <ShieldCheck size={18} />
          <span>
            Original practice content. Not affiliated with Microsoft.
          </span>
        </div>

        <div className="side-user">
          <div className="avatar">
            {displayName[0].toUpperCase()}
          </div>

          <div>
            <b>{displayName}</b>
            <small>{displayEmail}</small>
          </div>
        </div>
      </aside>

      {open && (
        <div
          className="overlay"
          onClick={() => setOpen(false)}
        />
      )}

      <main className="main">
        <header className="topbar">
          <button
            className="icon-btn mobile-only"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>

          <div className="top-search">
            <Search size={17} />
            <span>Search learning topics...</span>
          </div>

          <div className="top-actions">
            <button className="icon-btn">
              <Moon size={18} />
            </button>

            <Link className="avatar" to="/profile">
              {displayName[0].toUpperCase()}
            </Link>
          </div>
        </header>

        {children}
      </main>
    </div>
  )
}

function Landing() {
  return <div className="landing"><nav className="landing-nav"><div className="brand"><div className="brand-mark">A</div><b>AZ-900 Ready</b></div><div><Link className="text-link" to="/login">Log in</Link><Link className="btn primary" to="/signup">Get Started</Link></div></nav>
    <section className="hero"><div className="hero-copy"><span className="eyebrow"><Sparkles size={15}/> Built for focused Azure learning</span><h1>Know what to study. <span>Know when you're ready.</span></h1><p>Practice original Azure fundamentals questions, understand your mistakes, and build confidence through a learning loop that gets smarter with every session.</p><div className="hero-actions"><Link className="btn primary large" to="/signup">Start Practicing <ArrowRight size={18}/></Link><Link className="btn ghost large" to="/topics">Explore Topics</Link></div><p className="disclaimer">Unofficial learning and practice tool. Not affiliated with or endorsed by Microsoft.</p></div>
      <div className="hero-preview"><div className="preview-head"><div><small>Practice Readiness</small><strong>72%</strong></div><div className="ring">72</div></div><div className="mini-bars">{topics.map((t,i)=><div key={t.id}><div><span>{t.name}</span><b>{[82,69,61][i]}%</b></div><div className="bar"><i style={{width:`${[82,69,61][i]}%`}}/></div></div>)}</div><div className="mini-card"><Target size={18}/><div><b>Recommended next step</b><span>Practice Azure governance concepts</span></div><ArrowRight size={17}/></div></div></section>
    <section className="features"><div className="section-head"><span className="eyebrow">One learning loop</span><h2>Practice, measure, recover, improve.</h2></div><div className="feature-grid">{[['Smart Practice',Brain,'Original questions with clear explanations.'],['Readiness Tracking',TrendingUp,'See your practice performance over time.'],['Smart Recovery',Zap,'Find weak concepts and target them.'],['AI Study Buddy',Sparkles,'Get beginner-friendly explanations and analogies.']].map(([title,Icon,desc])=><div className="feature-card" key={title as string}><div className="feature-icon"><Icon size={21}/></div><h3>{title as string}</h3><p>{desc as string}</p></div>)}</div></section>
    <footer className="footer">AZ-900 Ready · Unofficial Azure fundamentals learning tool</footer>
  </div>
}

function Auth({ mode }: { mode: 'login' | 'signup' }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const nav = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!supabase) {
      setError('Supabase is not connected. Check your .env file.')
      return
    }

    if (!email || !pass) {
      setError('Please enter your email and password.')
      return
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your name.')
        return
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: {
            name: name.trim(),
          },
        },
      })

      if (error) {
        setError(error.message)
        return
      }

      if (data.session) {
        nav('/')
      } else {
        setMessage(
          'Account created! Check your email to confirm your account, then log in.'
        )
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      })

      if (error) {
        setError(error.message)
        return
      }

      nav('/')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="brand">
          <div className="brand-mark">A</div>
          <b>AZ-900 Ready</b>
        </Link>

        <div className="auth-heading">
          <h1>
            {mode === 'login'
              ? 'Welcome back'
              : 'Create your learning account'}
          </h1>

          <p>
            {mode === 'login'
              ? 'Continue your practice journey.'
              : 'Start building your Azure fundamentals.'}
          </p>
        </div>

        <form onSubmit={submit}>
          {mode === 'signup' && (
            <label>
              Full name
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </label>
          )}

          <label>
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              required
              minLength={6}
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          {message && (
            <p className="auth-success">
              {message}
            </p>
          )}

          <button className="btn primary full" type="submit">
            {mode === 'login' ? 'Log in' : 'Create account'}
            <ArrowRight size={17} />
          </button>
        </form>

        <p className="auth-switch">
          {mode === 'login' ? 'New here? ' : 'Already have an account? '}

          <Link to={mode === 'login' ? '/signup' : '/login'}>
            {mode === 'login' ? 'Create an account' : 'Log in'}
          </Link>
        </p>

        <div className="demo-note">
          Unofficial AZ-900 learning and practice tool.
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  const [attempts, setAttempts] = useState<Attempt[]>([])

  useEffect(() => {
    getAttempts().then(setAttempts)
  }, [])

  const total = attempts.reduce((a, x) => a + x.total, 0)
  const correct = attempts.reduce((a, x) => a + x.correct, 0)
  const readiness = pct(correct, total)

  const byTopic = topics.map((t) => {
    let c = 0
    let n = 0

    attempts.forEach((a) => {
      if (a.topicId === t.id) {
        c += a.correct
        n += a.total
      }
    })

    return {
      ...t,
      score: pct(c, n),
      n,
    }
  })

  const weakest = [...byTopic].sort((a, b) => a.score - b.score)[0]

  return (
    <Page
      title="Dashboard"
      subtitle="Your practice performance at a glance."
    >
      <div className="welcome">
        <div>
          <span className="eyebrow">Learning dashboard</span>
          <h1>Keep building your Azure confidence.</h1>
          <p>Your next best step is always one practice session away.</p>
        </div>

        <Link className="btn primary" to="/practice">
          Start a quiz <ArrowRight size={17} />
        </Link>
      </div>

      <div className="stats-grid">
        <Stat
          icon={Target}
          label="Practice Readiness"
          value={`${readiness}%`}
          note={readiness ? "Based on practice performance" : "Complete your first quiz"}
        />

        <Stat
          icon={BookOpen}
          label="Questions Answered"
          value={total}
          note="Across all sessions"
        />

        <Stat
          icon={CheckCircle2}
          label="Average Accuracy"
          value={`${readiness}%`}
          note="Correct answers"
        />

        <Stat
          icon={TrendingUp}
          label="Quizzes Completed"
          value={attempts.length}
          note="Practice sessions"
        />
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-head">
            <div>
              <h2>Topic performance</h2>
              <p>How each learning area is developing.</p>
            </div>

            <Link to="/progress">View progress</Link>
          </div>

          {byTopic.map((t) => (
            <div className="topic-row" key={t.id}>
              <div className="topic-title">
                <span>{t.name}</span>
                <b>{t.n ? `${t.score}%` : "—"}</b>
              </div>

              <div className="bar">
                <i style={{ width: `${t.score}%` }} />
              </div>
            </div>
          ))}
        </section>

        <section className="panel recovery">
          <div className="feature-icon">
            <Zap />
          </div>

          <span className="eyebrow">Smart Recovery</span>

          <h2>
            {weakest?.n
              ? `Focus on ${weakest.name}`
              : "Build your first baseline"}
          </h2>

          <p>
            {weakest?.n
              ? `Your current practice accuracy here is ${weakest.score}%. A targeted session can strengthen this area.`
              : "Take a 5 or 10-question quiz so the app can identify your strongest and weakest areas."}
          </p>

          <Link
            className="btn primary"
            to={weakest?.n ? "/recovery" : "/practice"}
          >
            {weakest?.n ? "Start recovery" : "Take first quiz"}
          </Link>
        </section>
      </div>

      <section className="panel">
        <div className="panel-head">
          <div>
            <h2>Recent activity</h2>
            <p>Your latest practice sessions.</p>
          </div>
        </div>

        {attempts.length === 0 ? (
          <Empty
            icon={BookOpen}
            text="Your quiz history will appear here after your first practice session."
            action="/practice"
            actionText="Start practicing"
          />
        ) : (
          <div className="activity">
            {attempts.slice(0, 5).map((a) => (
              <div className="activity-row" key={a.id}>
                <div className="activity-icon">
                  <CheckCircle2 />
                </div>

                <div>
                  <b>{topicName(a.topicId)}</b>
                  <small>{new Date(a.date).toLocaleString()}</small>
                </div>

                <strong>{a.score}%</strong>
              </div>
            ))}
          </div>
        )}
      </section>
    </Page>
  )
}

function Stat({icon:Icon,label,value,note}:{icon:any,label:string,value:any,note:string}){return <div className="stat-card"><div className="stat-icon"><Icon size={20}/></div><small>{label}</small><strong>{value}</strong><span>{note}</span></div>}
function Empty({icon:Icon,text,action,actionText}:{icon:any,text:string,action:string,actionText:string}){return <div className="empty"><Icon size={30}/><p>{text}</p><Link className="btn primary" to={action}>{actionText}</Link></div>}

function Page({title,subtitle,children}:{title:string,subtitle:string,children:React.ReactNode}){return <div className="page"><div className="page-title"><div><h1>{title}</h1><p>{subtitle}</p></div></div>{children}</div>}

function Practice(){
  const nav=useNavigate(); const [topic,setTopic]=useState<TopicId|'all'>('all'); const [difficulty,setDifficulty]=useState<Difficulty|'Mixed'>('Mixed'); const [count,setCount]=useState(10)
  function start(){nav(`/practice/run?topic=${topic}&difficulty=${difficulty}&count=${count}`)}
  return <Page title="Practice Quiz" subtitle="Choose a focused session and learn from every answer."><div className="setup-grid"><div className="panel setup-main"><span className="eyebrow">Build your session</span><h2>How do you want to practice?</h2><label>Topic<select value={topic} onChange={e=>setTopic(e.target.value as any)}><option value="all">All Topics</option>{topics.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></label><label>Difficulty<select value={difficulty} onChange={e=>setDifficulty(e.target.value as any)}><option>Mixed</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label><label>Questions<select value={count} onChange={e=>setCount(Number(e.target.value))}><option value="5">5 questions</option><option value="10">10 questions</option><option value="20">20 questions</option></select></label><button className="btn primary large full" onClick={start}>Start Practice <ArrowRight size={18}/></button></div><div className="panel setup-info"><div className="feature-icon"><Brain/></div><h2>Learn, don't just guess.</h2><p>Practice mode gives you an explanation, a simple explanation and a memory tip after each answer.</p><ul><li><CheckCircle2/> Original learning questions</li><li><CheckCircle2/> Immediate feedback</li><li><CheckCircle2/> Results saved locally</li><li><CheckCircle2/> Weak areas feed Smart Recovery</li></ul></div></div></Page>
}

function QuizRun(){
  const params=new URLSearchParams(useLocation().search); const topic=params.get('topic')||'all'; const difficulty=params.get('difficulty')||'Mixed'; const count=Number(params.get('count')||10)
  const pool=useMemo(()=>questions.filter(q=>(topic==='all'||q.topicId===topic)&&(difficulty==='Mixed'||q.difficulty===difficulty)).sort(()=>Math.random()-.5).slice(0,count),[])
  const [index,setIndex]=useState(0); const [selected,setSelected]=useState<number|null>(null); const [answers,setAnswers]=useState<Record<string,number>>({}); const [submitted,setSubmitted]=useState(false); const [start]=useState(Date.now()); const nav=useNavigate()
  const q=pool[index]
  if(!q)return <Page title="No questions found" subtitle="Try another topic or difficulty."><Empty icon={CircleHelp} text="There are not enough questions for this selection." action="/practice" actionText="Back to practice"/></Page>
  function choose(i:number){if(!submitted){setSelected(i);setAnswers(a=>({...a,[q.id]:i}))}}
  function next(){if(index<pool.length-1){setIndex(index+1);setSelected(answers[pool[index+1].id] ?? null);setSubmitted(false)}else{finish()}}
async function finish() {
  const records = pool.map((x) => ({
    questionId: x.id,
    selected: answers[x.id] ?? -1,
    correct: (answers[x.id] ?? -1) === x.answer,
  }))

  const correct = records.filter((x) => x.correct).length

  const attempt: Attempt = {
    id: crypto.randomUUID(),
    topicId: topic as any,
    score: pct(correct, pool.length),
    total: pool.length,
    correct,
    incorrect: pool.length - correct,
    duration: Math.round((Date.now() - start) / 1000),
    date: new Date().toISOString(),
    answers: records,
  }

  await saveAttempt(attempt)

  nav(`/results/${attempt.id}`)
}}

function Results() {
  const id = useLocation().pathname.split('/').pop()
  const [attempt, setAttempt] = useState<Attempt | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAttempts().then((attempts) => {
      const found = attempts.find((x) => x.id === id)
      setAttempt(found || null)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <Page
        title="Loading your result..."
        subtitle="Please wait while we load your practice result."
      >
        <div className="panel">
          <p>Loading result...</p>
        </div>
      </Page>
    )
  }

  if (!attempt) {
    return <Navigate to="/practice" />
  }

  const a = attempt

  return (
    <Page
      title="Practice Complete!"
      subtitle="Review your performance and decide what to do next."
    >
      <div className="result-hero">
        <div>
          <span className="eyebrow">Your result</span>
          <h1>{a.score}%</h1>
          <p>
            {a.correct} correct out of {a.total} questions.
          </p>
        </div>

        <div className="result-circle">
          {a.score}%
        </div>
      </div>

      <div className="stats-grid">
        <Stat
          icon={CheckCircle2}
          label="Correct"
          value={a.correct}
          note={`of ${a.total}`}
        />

        <Stat
          icon={CircleHelp}
          label="Incorrect"
          value={a.incorrect}
          note="Review these next"
        />

        <Stat
          icon={Clock3}
          label="Time"
          value={`${Math.max(1, Math.round(a.duration / 60))}m`}
          note="Session duration"
        />

        <Stat
          icon={Target}
          label="Practice score"
          value={`${a.score}%`}
          note="Not an exam prediction"
        />
      </div>

      <div className="result-actions">
        <Link className="btn primary" to="/review">
          Review Mistakes
        </Link>

        <Link className="btn ghost" to="/recovery">
          Smart Recovery
        </Link>

        <Link className="btn ghost" to="/practice">
          New Quiz
        </Link>
      </div>
    </Page>
  )
}

function Topics(){return <Page title="Topics" subtitle="Build your foundations one learning area at a time."><div className="topic-grid">{topics.map(t=><div className="topic-card" key={t.id}><div className="feature-icon"><BookOpen/></div><h2>{t.name}</h2><p>{t.description}</p><div className="topic-points"><span>Original questions</span><span>Simple explanations</span><span>Memory tips</span></div><Link className="btn primary" to={`/practice?topic=${t.id}`}>Practice topic <ArrowRight/></Link></div>)}</div></Page>}

function Progress() {
  const [attempts, setAttempts] = useState<Attempt[]>([])

useEffect(() => {
  getAttempts().then(setAttempts)
}, [])

  const totalQuestions = attempts.reduce(
    (sum, attempt) => sum + attempt.total,
    0
  )

  const totalCorrect = attempts.reduce(
    (sum, attempt) => sum + attempt.correct,
    0
  )

  const readiness = pct(totalCorrect, totalQuestions)

  const byTopic = topics.map((t) => {
    let correct = 0
    let total = 0

    attempts.forEach((a) => {
      if (a.topicId === t.id) {
        correct += a.correct
        total += a.total
      }
    })

    return {
      name: t.name.replace("Azure ", "").replace(" & Services", ""),
      score: pct(correct, total),
    }
  })

  return (
    <Page
      title="Progress"
      subtitle="Turn practice history into a clear learning picture."
    >
      <div className="stats-grid">
        <Stat
          icon={Target}
          label="Readiness"
          value={`${readiness}%`}
          note="Practice performance"
        />

        <Stat
          icon={BookOpen}
          label="Sessions"
          value={attempts.length}
          note="Completed quizzes"
        />

        <Stat
          icon={CheckCircle2}
          label="Questions"
          value={totalQuestions}
          note="Answered"
        />
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h2>Topic comparison</h2>
            <p>Accuracy by learning area.</p>
          </div>
        </div>

        {byTopic.map((topic) => (
          <div className="topic-row" key={topic.name}>
            <div className="topic-title">
              <span>{topic.name}</span>
              <b>{topic.score}%</b>
            </div>

            <div className="bar">
              <i style={{ width: `${topic.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="panel">
        <h2>Score history</h2>

        {attempts.length === 0 ? (
          <Empty
            icon={TrendingUp}
            text="Complete a quiz to build your performance history."
            action="/practice"
            actionText="Start quiz"
          />
        ) : (
          <div className="activity">
            {attempts.slice(0, 10).map((a) => (
              <div className="activity-row" key={a.id}>
                <div>
                  <b>{topicName(a.topicId)}</b>
                  <small>
                    {new Date(a.date).toLocaleDateString()} ·{" "}
                    {a.correct}/{a.total} correct
                  </small>
                </div>

                <strong>{a.score}%</strong>
              </div>
            ))}
          </div>
        )}
      </div>
    </Page>
  )
}

function Review() {
  const [attempts, setAttempts] = useState<Attempt[]>([])

  useEffect(() => {
    getAttempts().then(setAttempts)
  }, [])

  const mistakes = attempts
    .flatMap((a) =>
      a.answers
        .filter((x) => !x.correct)
        .map((x) => ({
          a,
          x,
          q: questions.find((q) => q.id === x.questionId),
        }))
    )
    .filter((x) => x.q)

  return (
    <Page
      title="Review Mistakes"
      subtitle="Turn wrong answers into your strongest learning opportunities."
    >
      {mistakes.length === 0 ? (
        <div className="panel">
          <Empty
            icon={CheckCircle2}
            text="No mistakes yet. Complete a quiz and missed questions will appear here."
            action="/practice"
            actionText="Start practicing"
          />
        </div>
      ) : (
        <div className="review-list">
          {mistakes.map(({ a, x, q }) => (
            <div
              className="panel mistake"
              key={`${a.id}-${x.questionId}`}
            >
              <div className="question-meta">
                <span>{topicName(q!.topicId)}</span>
                <span>{q!.difficulty}</span>
              </div>

              <h2>{q!.question}</h2>

              <p className="wrong-answer">
                Your answer:{' '}
                {x.selected >= 0
                  ? q!.options[x.selected]
                  : 'No answer'}
              </p>

              <p className="right-answer">
                Correct answer: {q!.options[q!.answer]}
              </p>

              <div className="feedback good">
                <b>Explanation</b>
                <p>{q!.explanation}</p>
                <small>{q!.memoryTip}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </Page>
  )
}

function Recovery() {
  const [attempts, setAttempts] = useState<Attempt[]>([])

  useEffect(() => {
    getAttempts().then(setAttempts)
  }, [])

  const rec = topics
    .map((t) => {
      let c = 0
      let n = 0

      attempts.forEach((a) => {
        if (a.topicId === t.id) {
          c += a.correct
          n += a.total
        }
      })

      return {
        ...t,
        score: pct(c, n),
        n,
      }
    })
    .filter((x) => x.n)
    .sort((a, b) => a.score - b.score)

  return (
    <Page
      title="Smart Recovery"
      subtitle="A targeted plan built from the areas that need the most practice."
    >
      <div className="recovery-hero">
        <div className="feature-icon">
          <Zap />
        </div>

        <span className="eyebrow">Your recovery plan</span>

        <h1>
          Strengthen the concepts that are holding you back.
        </h1>

        <p>
          Recommendations use your practice performance.
          They are learning guidance, not an exam prediction.
        </p>
      </div>

      {rec.length === 0 ? (
        <div className="panel">
          <Empty
            icon={Zap}
            text="Complete a quiz so Smart Recovery can identify your weak areas."
            action="/practice"
            actionText="Take a quiz"
          />
        </div>
      ) : (
        <div className="recovery-list">
          {rec.map((t, i) => (
            <div
              className="panel recovery-item"
              key={t.id}
            >
              <div className="number">
                {i + 1}
              </div>

              <div>
                <span className="eyebrow">
                  Priority {i + 1}
                </span>

                <h2>{t.name}</h2>

                <p>
                  You are currently at{' '}
                  <b>{t.score}% accuracy</b> across{' '}
                  {t.n} questions. A targeted session can
                  strengthen this area.
                </p>

                <Link
                  className="btn primary"
                  to={`/practice?topic=${t.id}`}
                >
                  Practice this area
                  <ArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </Page>
  )
}

function StudyBuddy(){const [messages,setMessages]=useState<{role:'ai'|'user',text:string}[]>([{role:'ai',text:"Hi! I'm your AZ-900 Study Buddy. Ask me to explain a concept, give you an analogy, or create a short original practice question."}]);const [input,setInput]=useState('');function send(text=input){if(!text.trim())return;setMessages(m=>[...m,{role:'user',text},{role:'ai',text:`Here's a beginner-friendly way to think about "${text}": start with the core idea, connect it to a real-world analogy, then test yourself with one small example. For this demo, the AI endpoint is not configured yet. Connect Gemini through a secure server-side endpoint to enable live tutoring.`}]);setInput('')}return <Page title="AI Study Buddy" subtitle="Ask questions. Get simple explanations. Learn with confidence."><div className="buddy"><div className="buddy-head"><div className="feature-icon"><Sparkles/></div><div><h2>Your Azure learning companion</h2><p>Focused on fundamentals, analogies and original practice.</p></div></div><div className="suggestions">{['Explain IaaS vs PaaS vs SaaS','What is a Resource Group?','Explain RBAC simply','Give me an analogy for Azure regions','Quiz me on cloud concepts'].map(s=><button key={s} onClick={()=>send(s)}>{s}</button>)}</div><div className="chat">{messages.map((m,i)=><div className={`bubble ${m.role}`} key={i}>{m.text}</div>)}</div><div className="chat-input"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')send()}} placeholder="Ask about an Azure concept..."/><button className="btn primary" onClick={()=>send()}>Send</button></div><small className="disclaimer">Live AI requires a secure server-side Gemini/API configuration. Never expose API keys in frontend code.</small></div></Page>}

function Profile() {
  const [user, setUser] = useState<any>(null)
  const [attempts, setAttempts] = useState<Attempt[]>([])

  useEffect(() => {
    if (!supabase) return

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null)
    })
  }, [])

  const name =
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Learner'

  const email = user?.email || ''

  return (
    <Page
      title="Profile"
      subtitle="Your learner identity and practice summary."
    >
      <div className="profile-grid">
        <div className="panel profile-card">
          <div className="big-avatar">
            {name[0].toUpperCase()}
          </div>

          <h2>{name}</h2>
          <p>{email}</p>

          <span className="pill">
            Supabase account
          </span>
        </div>

        <div className="stats-grid">
          <Stat
            icon={BookOpen}
            label="Quizzes"
            value={attempts.length}
            note="Completed"
          />

          <Stat
            icon={Target}
            label="Questions"
            value={attempts.reduce((a, x) => a + x.total, 0)}
            note="Answered"
          />

          <Stat
            icon={CheckCircle2}
            label="Correct"
            value={attempts.reduce((a, x) => a + x.correct, 0)}
            note="Total correct"
          />
        </div>
      </div>
    </Page>
  )
}

function SettingsPage(){
  const nav = useNavigate()

  async function logout() {
    if (supabase) {
      await supabase.auth.signOut()
    }

    clearUser()
    nav('/')
  }

  return (
    <Page
      title="Settings"
      subtitle="Manage your local learning experience."
    >
      <div className="panel settings-list">
        <div>
          <div>
            <h3>Appearance</h3>
            <p>Light theme is optimized for the hackathon demo.</p>
          </div>
          <button className="icon-btn">
            <Moon/>
          </button>
        </div>

        <div>
          <div>
            <h3>Learning preferences</h3>
            <p>
              Practice with original content and beginner-friendly explanations.
            </p>
          </div>
          <CheckCircle2/>
        </div>

        <div>
          <div>
            <h3>Sign out</h3>
            <p>Return to the login screen.</p>
          </div>

          <button className="btn ghost" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
    </Page>
  )
}

 export default function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold">AZ-900 Ready</div>
          <p className="mt-2 text-slate-400">
            Loading your learning dashboard...
          </p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <Shell>
              <Dashboard />
            </Shell>
          ) : (
            <Landing />
          )
        }
      />

      <Route path="/login" element={<Auth mode="login" />} />
      <Route path="/signup" element={<Auth mode="signup" />} />

      <Route
        path="/practice"
        element={
          <Shell>
            <Practice />
          </Shell>
        }
      />

      <Route
        path="/practice/run"
        element={
          <Shell>
            <QuizRun />
          </Shell>
        }
      />

      <Route
        path="/results/:id"
        element={
          <Shell>
            <Results />
          </Shell>
        }
      />

      <Route
        path="/topics"
        element={
          <Shell>
            <Topics />
          </Shell>
        }
      />

      <Route
        path="/progress"
        element={
          <Shell>
            <Progress />
          </Shell>
        }
      />

      <Route
        path="/review"
        element={
          <Shell>
            <Review />
          </Shell>
        }
      />

      <Route
        path="/recovery"
        element={
          <Shell>
            <Recovery />
          </Shell>
        }
      />

      <Route
        path="/study-buddy"
        element={
          <Shell>
            <StudyBuddy />
          </Shell>
        }
      />

      <Route
        path="/profile"
        element={
          <Shell>
            <Profile />
          </Shell>
        }
      />

      <Route
        path="/settings"
        element={
          <Shell>
            <SettingsPage />
          </Shell>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
  