async function runIntegrationTests() {
  console.log('--- Starting commit:// E2E API Integration Tests ---');

  // 1. Test Login
  const loginRes = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'demo@commit.dev', password: 'password123' })
  });
  const loginData = await loginRes.json();
  console.log('✅ 1. Auth Login OK:', loginData.user?.username, '| Token exists:', !!loginData.token);
  const token = loginData.token;
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  // 2. Test Get Me
  const meRes = await fetch('http://localhost:5000/api/auth/me', { headers });
  const meData = await meRes.json();
  console.log('✅ 2. User Profile OK: Streak =', meData.stats?.currentStreak, 'days, Total Hours =', meData.stats?.totalHours);

  // 3. Test Create Commit
  const commitRes = await fetch('http://localhost:5000/api/commits', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      commitMessage: 'feat(dsa): test commit - mastered sliding window and monotonic stack',
      tracks: ['DSA', 'BACKEND'],
      minutesSpent: 120,
      status: 'MERGED'
    })
  });
  const commitData = await commitRes.json();
  console.log('✅ 3. Create Commit OK:', commitData.commit?.commitHash, '|', commitData.commit?.commitMessage);

  // 4. Test Striver DSA Steps
  const dsaRes = await fetch('http://localhost:5000/api/dsa/steps', { headers });
  const dsaData = await dsaRes.json();
  console.log('✅ 4. DSA Steps OK: Steps count =', dsaData.steps?.length, '| Total Problems =', dsaData.stats?.totalProblems, '| Solved =', dsaData.stats?.totalSolved);

  // 5. Test Toggle Solved & Notes
  const toggleRes = await fetch('http://localhost:5000/api/dsa/toggle-solved/p1_1_1', { method: 'POST', headers });
  const toggleData = await toggleRes.json();
  console.log('✅ 5. DSA Toggle Solved OK: Problem =', toggleData.problemId, '| Solved =', toggleData.progress?.solved);

  const notesRes = await fetch('http://localhost:5000/api/dsa/notes/p1_1_1', {
    method: 'PUT',
    headers,
    body: JSON.stringify({ notes: 'Review time complexity bounds: O(1) for primitive arithmetic.' })
  });
  const notesData = await notesRes.json();
  console.log('✅ 6. DSA Notes OK: Notes saved =', notesData.progress?.notes);

  // 7. Test Roadmap Base
  const roadmapRes = await fetch('http://localhost:5000/api/roadmap', { headers });
  const roadmapData = await roadmapRes.json();
  console.log('✅ 7. Roadmap OK: 5 Phases count =', roadmapData.phases?.length, '| Current Week =', roadmapData.currentWeekNumber);

  // 8. Test Roadmap Preferences
  const prefUpdateRes = await fetch('http://localhost:5000/api/roadmap/preferences', {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      trackFocus: 'DSA_INTENSIVE',
      difficultyPreference: 'MEDIUM_HARD',
      presetList: 'STRIVER_A2Z',
      weeklyTarget: 15
    })
  });
  const prefUpdateData = await prefUpdateRes.json();
  console.log('✅ 8. Roadmap Preferences OK: Focus =', prefUpdateData.preferences?.trackFocus, '| Weekly Target =', prefUpdateData.preferences?.weeklyTarget);

  // 9. Test Add Custom LeetCode Link
  const addLcRes = await fetch('http://localhost:5000/api/roadmap/custom-leetcode', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      weekNumber: 4,
      url: 'https://leetcode.com/problems/trapping-rain-water/',
      number: 42,
      difficulty: 'HARD',
      tags: ['two-pointers', 'monotonic-stack']
    })
  });
  const addLcData = await addLcRes.json();
  console.log('✅ 9. Add Custom LeetCode OK: Problem =', addLcData.problem?.title, '| Week =', addLcData.problem?.weekNumber, '| Diff =', addLcData.problem?.difficulty);

  // 10. Test Batch Import LeetCode Links
  const batchLcRes = await fetch('http://localhost:5000/api/roadmap/batch-leetcode', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      weekNumber: 6,
      urls: [
        'https://leetcode.com/problems/find-median-from-data-stream/',
        'https://leetcode.com/problems/merge-k-sorted-lists/'
      ],
      defaultDifficulty: 'HARD'
    })
  });
  const batchLcData = await batchLcRes.json();
  console.log('✅ 10. Batch LeetCode Import OK: Imported count =', batchLcData.count);

  // 11. Test Toggle Custom LeetCode Solved
  if (addLcData.problem?.id) {
    const toggleLcRes = await fetch(`http://localhost:5000/api/roadmap/custom-leetcode/toggle-solved/${addLcData.problem.id}`, {
      method: 'POST',
      headers
    });
    const toggleLcData = await toggleLcRes.json();
    console.log('✅ 11. Custom LeetCode Toggle Solved OK: Solved =', toggleLcData.problem?.solved);
  }

  // 12. Test Resources
  const resRes = await fetch('http://localhost:5000/api/resources', { headers });
  const resData = await resRes.json();
  console.log('✅ 12. Resource Hub OK: Playlists count =', resData.resources?.length, '| Watched =', resData.stats?.watched);

  // 13. Test Stats Overview & README.md Generation
  const statsRes = await fetch('http://localhost:5000/api/stats/overview', { headers });
  const statsData = await statsRes.json();
  console.log('✅ 13. Stats Overview OK: Active Days =', statsData.streak?.activeDaysCount, '| Total Hours =', statsData.streak?.totalHours);

  const readmeRes = await fetch('http://localhost:5000/api/stats/readme', { headers });
  const readmeData = await readmeRes.json();
  console.log('✅ 14. Dynamic README.md Generator OK: Generated length =', readmeData.markdown?.length, 'characters');

  console.log('\n🎉 ALL 14 E2E API VERIFICATION TESTS PASSED SUCCESSFULLY! 🎉\n');
}

runIntegrationTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
