import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowRight, BarChart3, BookOpen, Brain, CheckCircle2, ChevronLeft, ChevronRight,
  CircleHelp, Clock3, Eye, EyeOff, Home, LayoutDashboard, LogIn, Menu, Moon, Play,
  RotateCcw, Search, Settings, ShieldCheck, Sparkles, Target, TrendingUp, User, X, Zap
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

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('az900-dark-mode') === 'true'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('az900-dark-mode', String(darkMode))
  }, [darkMode])
  
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
           <button
  type="button"
  className="theme-option"
  onClick={() => setDarkMode((current) => !current)}
>
  <Moon size={18} />
  <span>{darkMode ? 'Light mode' : 'Dark mode'}</span>
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
  const [confirmPass, setConfirmPass] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
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

      if (pass !== confirmPass) {
        setError('Passwords do not match.')
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
  <div className="password-field">
    <input
      required
      minLength={6}
      type={showPass ? 'text' : 'password'}
      value={pass}
      onChange={(e) => setPass(e.target.value)}
      placeholder="••••••••"
    />

    <button
      type="button"
      className="password-toggle"
      onClick={() => setShowPass(!showPass)}
      aria-label={showPass ? 'Hide password' : 'Show password'}
    >
      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
</label>


          {mode === 'signup' && (
            <label>
              Confirm password
              <div className="password-field">
                <input
                  required
                  minLength={6}
                  type={showConfirmPass ? 'text' : 'password'}
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPass((prev) => !prev)}
                  aria-label={
                    showConfirmPass
                      ? 'Hide confirm password'
                      : 'Show confirm password'
                  }
                >
                  {showConfirmPass ? '◉' : '◌'}
                </button>
              </div>

              {confirmPass && pass !== confirmPass && (
                <span className="password-mismatch">
                  Passwords do not match.
                </span>
              )}

              {confirmPass && pass === confirmPass && (
                <span className="password-match">
                  ✓ Passwords match
                </span>
              )}
            </label>
          )}

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

          <button
            className="btn primary full"
            type="submit"
            disabled={
              mode === 'signup' &&
              !!confirmPass &&
              pass !== confirmPass
            }
          >
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

function QuizRun() {
  const location = useLocation()
  const nav = useNavigate()

  const params = new URLSearchParams(location.search)

  const topic = params.get('topic') || 'all'
  const difficulty = params.get('difficulty') || 'Mixed'
  const count = Number(params.get('count') || 10)

  const pool = useMemo(() => {
    return questions
      .filter(
        (q) =>
          (topic === 'all' || q.topicId === topic) &&
          (difficulty === 'Mixed' || q.difficulty === difficulty)
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
  }, [topic, difficulty, count])

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [start] = useState(Date.now())

  const q = pool[index]

  /*
    Shuffle the answer choices for the current question.

    originalIndex remembers where each answer was in the
    original question, so the correct answer stays correct
    even after the choices are shuffled.
  */
  const shuffledOptions = useMemo(() => {
    if (!q) return []

    const options = q.options.map((option, originalIndex) => ({
      option,
      originalIndex,
    }))

    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))

      ;[options[i], options[j]] = [options[j], options[i]]
    }

    return options
  }, [q?.id])

  if (!q) {
    return (
      <Page
        title="No questions found"
        subtitle="Try another topic or difficulty."
      >
        <Empty
          icon={CircleHelp}
          text="There are not enough questions for this selection."
          action="/practice"
          actionText="Back to Practice"
        />
      </Page>
    )
  }

  function choose(displayIndex: number) {
    if (!submitted) {
      const originalIndex =
        shuffledOptions[displayIndex].originalIndex

      // selected stores the DISPLAY position
      setSelected(displayIndex)

      // answers stores the ORIGINAL position
      setAnswers((a) => ({
        ...a,
        [q.id]: originalIndex,
      }))
    }
  }

  function next() {
    if (index < pool.length - 1) {
      const nextIndex = index + 1

      setIndex(nextIndex)

      // Start the next question with no answer selected.
      // The answer record is already stored in `answers`.
      setSelected(null)

      setSubmitted(false)
    } else {
      finish()
    }
  }

  async function finish() {
    const records = pool.map((x) => ({
      questionId: x.id,
      selected: answers[x.id] ?? -1,
      correct: (answers[x.id] ?? -1) === x.answer,
    }))

    const correct = records.filter((x) => x.correct).length

    const attempt: Attempt = {
      id: crypto.randomUUID(),
      topicId: topic as TopicId | 'all',
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
  }

  // Is the currently selected DISPLAY position actually correct?
  const selectedIsCorrect =
    selected !== null &&
    shuffledOptions[selected]?.originalIndex === q.answer

  return (
    <div className="quiz-page">
      <div className="quiz-top">
        <Link to="/practice" className="text-link">
          <ChevronLeft />
          Exit
        </Link>

        <div className="quiz-progress">
          <span>
            Question {index + 1} of {pool.length}
          </span>

          <div className="bar">
            <i
              style={{
                width: `${((index + 1) / pool.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <span className="pill">{difficulty}</span>
      </div>

      <div className="quiz-card">
        <div className="question-meta">
          <span>{topicName(q.topicId)}</span>
          <span>{q.concept}</span>
        </div>

        <h1>{q.question}</h1>

        <div className="options">
          {shuffledOptions.map((item, i) => (
            <button
              key={item.option}
              className={`option ${
                selected === i ? 'selected' : ''
              } ${
                submitted &&
                item.originalIndex === q.answer
                  ? 'correct'
                  : ''
              } ${
                submitted &&
                selected === i &&
                item.originalIndex !== q.answer
                  ? 'wrong'
                  : ''
              }`}
              onClick={() => choose(i)}
            >
              <span>{String.fromCharCode(65 + i)}</span>

              {item.option}

              {submitted &&
              item.originalIndex === q.answer ? (
                <CheckCircle2 />
              ) : null}
            </button>
          ))}
        </div>

        {submitted && (
          <div
            className={`feedback ${
              selectedIsCorrect ? 'good' : 'bad'
            }`}
          >
            <b>
              {selectedIsCorrect
                ? 'Correct!'
                : 'Not quite.'}
            </b>

            <p>{q.explanation}</p>

            <small>
              <strong>Simple:</strong>{' '}
              {q.simpleExplanation}
            </small>

            <small>
              <strong>Memory tip:</strong>{' '}
              {q.memoryTip}
            </small>
          </div>
        )}

        <div className="quiz-actions">
          {submitted ? (
            <button
              className="btn primary"
              onClick={next}
            >
              {index === pool.length - 1
                ? 'Finish Quiz'
                : 'Next Question'}

              <ChevronRight />
            </button>
          ) : (
            <button
              className="btn primary"
              disabled={selected === null}
              onClick={() => setSubmitted(true)}
            >
              Check Answer
              <CheckCircle2 />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

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
    const nav = useNavigate()

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


function practiceWeakArea(topicId: TopicId) {
  nav(`/practice/run?topic=${topicId}&difficulty=Mixed&count=10`)
}

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
                <strong>Your answer:</strong>{' '}
                {x.selected >= 0
                  ? q!.options[x.selected]
                  : 'No answer'}
              </p>

              <p className="right-answer">
                <strong>Correct answer:</strong>{' '}
                {q!.options[q!.answer]}
              </p>

              <div className="feedback good">
                <b>Explanation</b>
                <p>{q!.explanation}</p>

                <div className="review-learning-point">
                  <strong>Simple explanation</strong>
                  <p>{q!.simpleExplanation}</p>
                </div>

                <div className="review-learning-point">
                  <strong>🧠 Memory tip</strong>
                  <p>{q!.memoryTip}</p>
                </div>
              </div>

              <div className="review-actions">
                <button
                  className="btn primary"
                  onClick={() =>
                    practiceWeakArea(q!.topicId)
                  }
                >
                  <RotateCcw size={18} />
                  Practice This Weak Area
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Page>
  )
}

function Recovery() {
  const nav = useNavigate()
  const [attempts, setAttempts] = useState<Attempt[]>([])

  useEffect(() => {
    getAttempts().then(setAttempts)
  }, [])

  // Count wrong answers by topic
  const topicStats = topics
    .map((topic) => {
      const topicAttempts = attempts.filter(
        (attempt) =>
          attempt.topicId === topic.id ||
          attempt.topicId === 'all'
      )

  const wrongQuestions = topicAttempts
  .flatMap((attempt) =>
    attempt.answers
      .filter((answer) => !answer.correct)
      .map((answer) => ({
        answer,
        question: questions.find(
          (q) => q.id === answer.questionId
        ),
      }))
  )
  .filter(
    (item) =>
      item.question &&
      item.question.topicId === topic.id
  )

      const totalQuestions = topicAttempts.reduce(
        (sum, attempt) => {
          return (
            sum +
            attempt.answers.filter((answer) => {
              const q = questions.find(
                (question) => question.id === answer.questionId
              )

              return q?.topicId === topic.id
            }).length
          )
        },
        0
      )

      const wrongCount = wrongQuestions.length

      const accuracy =
        totalQuestions > 0
          ? Math.round(
              ((totalQuestions - wrongCount) /
                totalQuestions) *
                100
            )
          : 0

      return {
        topic,
        wrongCount,
        totalQuestions,
        accuracy,
        wrongQuestions,
      }
    })
    .filter((item) => item.totalQuestions > 0)
    .sort((a, b) => {
      // Weakest topic first
      if (a.accuracy !== b.accuracy) {
        return a.accuracy - b.accuracy
      }

      return b.wrongCount - a.wrongCount
    })

  const weakest = topicStats[0]

  function practiceTopic(topicId: TopicId) {
  nav(`/practice/run?topic=${topicId}&difficulty=Mixed&count=10`)
}

  return (
    <Page
      title="Smart Recovery"
      subtitle="A targeted plan built from the areas that need the most practice."
    >
      <div className="recovery-hero panel">
        <div>
          <span className="eyebrow">Your recovery plan</span>

          <h2>
            Strengthen the concepts that are holding you back.
          </h2>

          <p>
            Recommendations use your practice performance.
            They are learning guidance, not an exam prediction.
          </p>
        </div>

        <div className="feature-icon">
          <Zap />
        </div>
      </div>

      {topicStats.length === 0 ? (
        <div className="panel">
          <Empty
            icon={Zap}
            text="Complete a quiz so Smart Recovery can identify your weak areas."
            action="/practice"
            actionText="Take a quiz"
          />
        </div>
      ) : (
        <>
          {weakest && (
            <div className="panel recovery-focus">
              <div className="question-meta">
                <span>Priority area</span>
                <span>{weakest.accuracy}% accuracy</span>
              </div>

              <h2>{weakest.topic.name}</h2>

              <p>
                You have missed {weakest.wrongCount}{' '}
                {weakest.wrongCount === 1
                  ? 'question'
                  : 'questions'}{' '}
                in this area. Practice it again before moving
                on.
              </p>

              <button
                className="btn primary"
                onClick={() =>
                  practiceTopic(weakest.topic.id)
                }
              >
                <RotateCcw size={18} />
                Practice Weak Area
              </button>
            </div>
          )}

          <div className="recovery-grid">
            {topicStats.map((item) => (
              <div
                className="panel recovery-card"
                key={item.topic.id}
              >
                <div className="question-meta">
                  <span>{item.topic.name}</span>

                  <span>
                    {item.accuracy}% accuracy
                  </span>
                </div>

                <h3>{item.topic.name}</h3>

                <p>
                  {item.wrongCount === 0
                    ? 'Great work. Keep this topic fresh.'
                    : `${item.wrongCount} ${
                        item.wrongCount === 1
                          ? 'missed question'
                          : 'missed questions'
                      } from your practice.`}
                </p>

                <div className="progress">
                  <i
                    style={{
                      width: `${item.accuracy}%`,
                    }}
                  />
                </div>

                <button
                  className="btn secondary"
                  onClick={() =>
                    practiceTopic(item.topic.id)
                  }
                >
                  Practice Topic
                  <ArrowRight size={17} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </Page>
  )
}

function StudyBuddy() {
  const [messages, setMessages] = useState<
    { role: 'ai' | 'user'; text: string }[]
  >([
    {
      role: 'ai',
      text: "Hi! I'm your AZ-900 Study Buddy. I'll explain a concept simply, give you a mini question, check your answer, and guide you to the next step.",
    },
  ])

  const [input, setInput] = useState('')
  const [activeQuestion, setActiveQuestion] =
    useState<Question | null>(null)

  const [waitingForAnswer, setWaitingForAnswer] =
    useState(false)

  const [answered, setAnswered] = useState(false)

  function addAI(text: string) {
    setMessages((m) => [
      ...m,
      {
        role: 'ai',
        text,
      },
    ])
  }

  function addUser(text: string) {
    setMessages((m) => [
      ...m,
      {
        role: 'user',
        text,
      },
    ])
  }

  function startPracticeQuestion(topicId?: TopicId) {
    const pool = questions.filter(
      (q) => !topicId || q.topicId === topicId
    )

    if (pool.length === 0) {
      addAI(
        'I could not find a practice question for that topic yet.'
      )
      return
    }

    const q =
      pool[Math.floor(Math.random() * pool.length)]

    setActiveQuestion(q)
    setWaitingForAnswer(true)
    setAnswered(false)

    addAI(
  `📝 MINI QUESTION\n\n${q.question}\n\nA. ${q.options[0]}\n\nB. ${q.options[1]}\n\nC. ${q.options[2]}\n\nD. ${q.options[3]}\n\nReply with A, B, C, or D.`
)
  }

  function explainConcept(text: string) {
    const lower = text.toLowerCase()

    let explanation =
      `Think of ${text} as an Azure building block. ` +
      `The key idea is to understand what it does, why you use it, and when it is useful.`

    if (
      lower.includes('iaas') ||
      lower.includes('paas') ||
      lower.includes('saas')
    ) {
      explanation =
        'IaaS, PaaS and SaaS describe how much of the technology Azure manages for you. IaaS gives you the most control, PaaS lets Azure manage more of the platform, and SaaS gives you a ready-to-use application.'
    } else if (
      lower.includes('resource group')
    ) {
      explanation =
        'A Resource Group is like a folder for Azure resources. You can put related resources together so they are easier to manage, monitor and delete.'
    } else if (lower.includes('rbac')) {
      explanation =
        'RBAC means Role-Based Access Control. It controls who can do what with Azure resources. Think: person + role + resource.'
    } else if (lower.includes('region')) {
      explanation =
        'An Azure region is a geographic area containing one or more Azure datacenters. Choosing a region helps with location, performance and data-residency requirements.'
    } else if (lower.includes('availability')) {
      explanation =
        'Availability means how often a service is operational and accessible. Azure uses redundancy and other features to help keep services available.'
    }

    addAI(explanation)

    setTimeout(() => {
      startPracticeQuestion()
    }, 500)
  }

  function checkAnswer(answerText: string) {
    if (!activeQuestion) {
      return
    }

    const answer = answerText.trim().toLowerCase()

    const letters = ['a', 'b', 'c', 'd']

    let selected = -1

    if (letters.includes(answer)) {
      selected = letters.indexOf(answer)
    } else {
      selected = activeQuestion.options.findIndex(
        (option) =>
          option.toLowerCase() === answer
      )
    }

    if (selected === -1) {
      addAI(
        'Please answer with A, B, C, D, or type the full answer.'
      )
      return
    }

    const correct =
      selected === activeQuestion.answer

    setWaitingForAnswer(false)
    setAnswered(true)

   if (correct) {
  addAI(
    `✅ CORRECT!\n\n${activeQuestion.explanation}\n\n💡 SIMPLE EXPLANATION\n${activeQuestion.simpleExplanation}\n\n🧠 MEMORY TIP\n${activeQuestion.memoryTip}\n\n➡️ Choose a next step below.`
  )
} else {
  addAI(
    `❌ NOT QUITE.\n\n✅ CORRECT ANSWER\n${activeQuestion.options[activeQuestion.answer]}\n\n📖 EXPLANATION\n${activeQuestion.explanation}\n\n💡 SIMPLE EXPLANATION\n${activeQuestion.simpleExplanation}\n\n🧠 MEMORY TIP\n${activeQuestion.memoryTip}\n\n➡️ Choose a next step below.`
  )
}

    setInput('')
  }

  function send() {
    const text = input.trim()

    if (!text) {
      return
    }

    addUser(text)
    setInput('')

    if (waitingForAnswer) {
      checkAnswer(text)
      return
    }

    const lower = text.toLowerCase()

    if (
      lower.includes('quiz me') ||
      lower.includes('test me') ||
      lower.includes('question')
    ) {
      startPracticeQuestion()
      return
    }

    explainConcept(text)
  }

  return (
    <Page
      title="AI Study Buddy"
      subtitle="Ask questions. Get simple explanations. Practice what you learn."
    >
      <div className="buddy">
        <div className="buddy-head">
          <div className="feature-icon">
            <Sparkles />
          </div>

          <div>
            <h2>Your Azure learning companion</h2>
            <p>
              Learn a concept, answer a mini question,
              then get immediate feedback.
            </p>
          </div>
        </div>

        <div className="suggestions">
          {[
            'Explain IaaS vs PaaS vs SaaS',
            'What is a Resource Group?',
            'Explain RBAC simply',
            'Explain Azure regions',
            'Quiz me on cloud concepts',
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                addUser(suggestion)

                if (
                  suggestion
                    .toLowerCase()
                    .includes('quiz me')
                ) {
                  startPracticeQuestion()
                } else {
                  explainConcept(suggestion)
                }
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="chat">
          {messages.map((message, index) => (
            <div
              className={`bubble ${message.role}`}
              key={index}
            >
              {message.text}
            </div>
          ))}
        </div>

        {answered && activeQuestion && (
          <div className="buddy-next">
            <button
              className="btn primary"
              onClick={() => {
                startPracticeQuestion()
              }}
            >
              <RotateCcw size={18} />
              Try Another Question
            </button>

            <button
              className="btn"
              onClick={() => {
                setAnswered(false)
                setActiveQuestion(null)
                setWaitingForAnswer(false)

                const topic =
                  topicName(
                    activeQuestion.topicId
                  )

                addAI(
                  `Let's learn more about ${topic}. I'll explain it simply, then give you another question.`
                )

                setTimeout(() => {
                  explainConcept(topic)
                }, 300)
              }}
            >
              <BookOpen size={18} />
              Learn This Topic
            </button>
          </div>
        )}

        <div className="chat-input">
          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                send()
              }
            }}
            placeholder={
              waitingForAnswer
                ? 'Type A, B, C, D, or your answer...'
                : 'Ask about an Azure concept...'
            }
          />

          <button
            className="btn primary"
            onClick={send}
          >
            Send
          </button>
        </div>

        <small className="disclaimer">
          Study Buddy currently uses the original
          AZ-900 learning content in this app.
          Live AI can be connected later through a
          secure server-side endpoint.
        </small>
      </div>
    </Page>
  )
}

function Profile() {
  const [user, setUser] = useState<any>(null)
  const [attempts, setAttempts] = useState<Attempt[]>([])

  useEffect(() => {
    if (supabase) {
      supabase.auth.getUser().then(({ data }) => {
        setUser(data.user ?? null)
      })
    }

    getAttempts().then((savedAttempts) => {
      setAttempts(savedAttempts)
    })
  }, [])

  const name =
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Learner'

  const email = user?.email || ''

  const totalQuestions = attempts.reduce(
    (total, attempt) => total + attempt.total,
    0
  )

  const totalCorrect = attempts.reduce(
    (total, attempt) => total + attempt.correct,
    0
  )

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
            value={totalQuestions}
            note="Answered"
          />

          <Stat
            icon={CheckCircle2}
            label="Correct"
            value={totalCorrect}
            note="Total correct"
          />
        </div>
      </div>
    </Page>
  )
}

function SettingsPage(){
  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem('az900-dark-mode') === 'true'
})
useEffect(() => {
  document.documentElement.classList.toggle('dark', darkMode)
  localStorage.setItem('az900-dark-mode', String(darkMode))
}, [darkMode])

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
  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem('az900-dark-mode') === 'true'
})
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
  