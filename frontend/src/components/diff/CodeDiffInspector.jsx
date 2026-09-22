import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GitCompare, 
  Copy, 
  Check, 
  Code, 
  Sparkles, 
  Split, 
  FileCode,
  Layers,
  ArrowRight
} from 'lucide-react';

const DIFF_PRESETS = [
  {
    id: 'kadane',
    title: "Array: Maximum Subarray (Brute Force vs Kadane's O(N))",
    track: 'DSA',
    oldCode: `// ❌ Naive Brute Force: O(N^3) Time, O(1) Space
public int maxSubArray(int[] nums) {
    int max = Integer.MIN_VALUE;
    for (int i = 0; i < nums.length; i++) {
        for (int j = i; j < nums.length; j++) {
            int sum = 0;
            for (int k = i; k <= j; k++) {
                sum += nums[k];
            }
            max = Math.max(max, sum);
        }
    }
    return max;
}`,
    newCode: `// ✅ Optimal Kadane's Algorithm: O(N) Time, O(1) Space
public int maxSubArray(int[] nums) {
    int max = nums[0];
    int currentSum = 0;
    for (int num : nums) {
        currentSum += num;
        max = Math.max(max, currentSum);
        if (currentSum < 0) {
            currentSum = 0; // Reset running sum on negative drop
        }
    }
    return max;
}`
  },
  {
    id: 'jwt-security',
    title: 'Backend: Spring Security 5 vs Spring Security 6 (SecurityFilterChain)',
    track: 'BACKEND',
    oldCode: `// ❌ Deprecated Spring Security 5 (Adapter Pattern)
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeRequests()
            .antMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated();
    }
}`,
    newCode: `// ✅ Modern Spring Security 6 Component-Based Lambda DSL
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .build();
    }
}`
  },
  {
    id: 'sliding-window',
    title: 'DSA: Longest Substring Without Repeating (O(N^2) vs O(N) Window)',
    track: 'DSA',
    oldCode: `// ❌ Quadratic Check: O(N^2) Time, O(N) Space
public int lengthOfLongestSubstring(String s) {
    int maxLen = 0;
    for (int i = 0; i < s.length(); i++) {
        Set<Character> seen = new HashSet<>();
        for (int j = i; j < s.length(); j++) {
            if (seen.contains(s.charAt(j))) break;
            seen.add(s.charAt(j));
            maxLen = Math.max(maxLen, j - i + 1);
        }
    }
    return maxLen;
}`,
    newCode: `// ✅ Optimal Sliding Window + HashMap: O(N) Time, O(min(N, M)) Space
public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> charMap = new HashMap<>();
    int maxLen = 0, left = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (charMap.containsKey(c)) {
            left = Math.max(left, charMap.get(c) + 1);
        }
        charMap.put(c, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`
  }
];

export default function CodeDiffInspector() {
  const { notifyGit } = useApp();
  const [selectedPreset, setSelectedPreset] = useState(DIFF_PRESETS[0]);
  const [copied, setCopied] = useState(false);
  const [diffMode, setDiffMode] = useState('split'); // 'split' or 'unified'

  const handleCopyDiff = () => {
    const text = `--- ${selectedPreset.title} (Before)\n+++ ${selectedPreset.title} (Optimized)\n\n${selectedPreset.oldCode.split('\n').map(l => `- ${l}`).join('\n')}\n\n${selectedPreset.newCode.split('\n').map(l => `+ ${l}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    notifyGit('📋 Formatted Git Diff copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0b0f1a] border border-slate-800 rounded-lg p-5 font-mono space-y-4 shadow-xl">
      
      {/* Header & Preset Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <GitCompare className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Code Diff Inspector (Pattern Comparison)
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Inspect time & space optimizations side-by-side with real git diff syntax
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyDiff}
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{copied ? 'Copied!' : 'Copy Diff'}</span>
          </button>
        </div>
      </div>

      {/* Preset Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {DIFF_PRESETS.map(preset => (
          <button
            key={preset.id}
            onClick={() => setSelectedPreset(preset)}
            className={`px-3 py-1.5 rounded text-xs border transition-colors cursor-pointer text-left ${
              selectedPreset.id === preset.id
                ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 font-bold'
                : 'bg-[#070a12] border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            {preset.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Title */}
      <div className="text-xs font-bold text-white bg-[#050810] border border-slate-800 p-2.5 rounded flex items-center justify-between">
        <span>{selectedPreset.title}</span>
        <span className="text-[10px] text-cyan-400">[{selectedPreset.track}]</span>
      </div>

      {/* Side-by-Side Diff View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Left: Naive / Before */}
        <div className="bg-[#050810] border border-red-500/30 rounded-lg overflow-hidden flex flex-col">
          <div className="bg-red-950/30 border-b border-red-500/30 px-3 py-1.5 text-[11px] font-bold text-red-400 flex items-center justify-between">
            <span>--- /dev/naive_approach.java</span>
            <span>UNOPTIMIZED</span>
          </div>
          <pre className="p-3 text-[11px] font-mono text-red-300 leading-relaxed overflow-x-auto whitespace-pre-wrap flex-1 bg-red-950/5">
            {selectedPreset.oldCode}
          </pre>
        </div>

        {/* Right: Optimal / After */}
        <div className="bg-[#050810] border border-emerald-500/30 rounded-lg overflow-hidden flex flex-col">
          <div className="bg-emerald-950/30 border-b border-emerald-500/30 px-3 py-1.5 text-[11px] font-bold text-emerald-400 flex items-center justify-between">
            <span>+++ /dev/optimal_solution.java</span>
            <span>MERGE READY</span>
          </div>
          <pre className="p-3 text-[11px] font-mono text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre-wrap flex-1 bg-emerald-950/5">
            {selectedPreset.newCode}
          </pre>
        </div>

      </div>

    </div>
  );
}
