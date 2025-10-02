# Frontend Architecture Rules

## 🏗️ Clean Architecture Principles

### 1. **Separation of Concerns**
- **Pages** - רק composition של components
- **Components** - רק UI logic ו-presentation
- **Hooks** - data fetching ו-state management
- **Services** - API calls ו-business logic

### 2. **Component Structure**
```
app/[page]/page.tsx          # רק composition
├── components/[feature]/    # UI components
├── hooks/use[Feature].ts    # data fetching
└── services/[feature].ts    # API calls
```

### 3. **Data Fetching Pattern**
```tsx
// ❌ DON'T: Mix data fetching in components
function TeamPage() {
  const [team, setTeam] = useState(null);
  useEffect(() => {
    fetch('/api/teams').then(setTeam);
  }, []);
  return <div>{team.name}</div>;
}

// ✅ DO: Use dedicated hooks
function TeamPage() {
  const { data: team } = useTeam(slug);
  return <TeamHero team={team} />;
}
```

### 4. **Component Size Limits**
- **Pages**: מקסימום 50 שורות
- **Components**: מקסימום 100 שורות
- **Hooks**: מקסימום 80 שורות
- **Services**: מקסימום 150 שורות

### 5. **File Organization**
```
src/
├── app/                    # Next.js pages (composition only)
├── components/            # UI components
│   ├── ui/               # Base components
│   └── [feature]/        # Feature-specific components
├── hooks/                # Custom hooks (data fetching)
├── services/             # API services
├── lib/                  # Utilities
└── types/                # TypeScript definitions
```

## 🎯 Component Guidelines

### Pages (app/[page]/page.tsx)
```tsx
// ✅ Good: Clean composition
export default function TeamPage() {
  const { slug } = useParams();
  const { data: team } = useTeam(slug);
  const { fixtures } = useTeamFixtures(slug);

  if (!team) return <NotFound />;

  return (
    <div>
      <TeamHero team={team} />
      <TeamFixtures fixtures={fixtures} />
    </div>
  );
}
```

### Components
```tsx
// ✅ Good: Single responsibility
export function TeamHero({ team }: { team: Team }) {
  return (
    <div className="hero">
      <h1>{team.name}</h1>
      <img src={team.logo} alt={team.name} />
    </div>
  );
}
```

### Hooks
```tsx
// ✅ Good: Data fetching only
export function useTeam(slug: string) {
  return useQuery({
    queryKey: ['team', slug],
    queryFn: () => TeamService.getTeam(slug),
    staleTime: 1000 * 60 * 60, // 1 hour cache
  });
}
```

### Services
```tsx
// ✅ Good: API calls only
export class TeamService {
  static async getTeam(slug: string): Promise<Team> {
    const response = await apiClient.get(`/teams/${slug}`);
    return response.data;
  }
}
```

## 🚫 Anti-Patterns

### ❌ Don't Mix Responsibilities
```tsx
// ❌ BAD: Component doing too much
function TeamPage() {
  const [team, setTeam] = useState(null);
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // API calls
    fetchTeam().then(setTeam);
    fetchFixtures().then(setFixtures);
  }, []);
  
  // Business logic
  const processedFixtures = fixtures.map(f => ({
    ...f,
    formattedDate: formatDate(f.date)
  }));
  
  // UI rendering
  return (
    <div>
      {/* Complex JSX */}
    </div>
  );
}
```

### ❌ Don't Create God Components
```tsx
// ❌ BAD: One component doing everything
function TeamPage() {
  return (
    <div>
      {/* Hero section */}
      <div className="hero">
        {/* 50 lines of hero JSX */}
      </div>
      
      {/* Stats section */}
      <div className="stats">
        {/* 30 lines of stats JSX */}
      </div>
      
      {/* Fixtures section */}
      <div className="fixtures">
        {/* 40 lines of fixtures JSX */}
      </div>
    </div>
  );
}
```

## ✅ Best Practices

### 1. **Component Composition**
```tsx
// ✅ Good: Break into smaller components
function TeamPage() {
  return (
    <div>
      <TeamHero team={team} />
      <TeamStats stats={stats} />
      <TeamFixtures fixtures={fixtures} />
    </div>
  );
}
```

### 2. **Custom Hooks for Logic**
```tsx
// ✅ Good: Extract logic to hooks
function useTeamData(slug: string) {
  const { data: team } = useTeam(slug);
  const { data: fixtures } = useTeamFixtures(slug);
  const { data: stats } = useTeamStats(slug);
  
  return { team, fixtures, stats };
}
```

### 3. **Type Safety**
```tsx
// ✅ Good: Proper TypeScript
interface TeamPageProps {
  slug: string;
}

export default function TeamPage({ slug }: TeamPageProps) {
  const { data: team } = useTeam(slug);
  
  if (!team) return <NotFound />;
  
  return <TeamHero team={team} />;
}
```

## 🔄 Migration Strategy

When refactoring existing components:

1. **Extract Data Fetching** → Move to custom hooks
2. **Split Large Components** → Break into smaller pieces
3. **Separate UI Logic** → Move business logic to services
4. **Add Type Safety** → Define proper interfaces
5. **Test Each Piece** → Ensure functionality is preserved

## 📏 Code Quality Metrics

- **Cyclomatic Complexity**: מקסימום 10
- **Function Length**: מקסימום 20 שורות
- **Component Props**: מקסימום 5 props
- **Hook Dependencies**: מקסימום 3 dependencies
- **File Length**: מקסימום 200 שורות

---

**Remember**: Clean code is not about being clever, it's about being clear and maintainable.
