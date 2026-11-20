import test from 'node:test';
import assert from 'node:assert/strict';
import {
  advanceSprintRound,
  applyHintTier,
  buildDeckForFilter,
  startSprintRun,
  submitSprintAnswer,
} from './seGameEngine';

test('buildDeckForFilter returns valid unit-filtered decks', () => {
  const allDeck = buildDeckForFilter('all');
  assert.equal(allDeck.length, 10);

  const firstHalf = buildDeckForFilter('units1to3');
  assert.ok(firstHalf.length > 0);
  assert.ok(firstHalf.every((c) => c.unitNumber <= 3));

  const secondHalf = buildDeckForFilter('units4to6');
  assert.ok(secondHalf.length > 0);
  assert.ok(secondHalf.every((c) => c.unitNumber >= 4));
});

test('correct answers build streak multiplier and advance score cleanly', () => {
  let state = startSprintRun('all');
  const card0 = state.deck[0];
  state = submitSprintAnswer(state, card0.correctIndex);
  assert.equal(state.lastOutcome, 'correct');
  assert.equal(state.streak, 1);
  assert.equal(state.score, 100);

  state = advanceSprintRound(state);
  assert.equal(state.roundIndex, 1);
  assert.equal(state.selectedOptionIndex, null);

  const card1 = state.deck[1];
  state = submitSprintAnswer(state, card1.correctIndex);
  assert.equal(state.streak, 2);
  assert.equal(state.score, 300); // 100 + 100 * 2
});

test('3-tier hint system eliminates 2 wrong options on Tier 2 and scales points', () => {
  let state = startSprintRun('all');
  const card = state.deck[0];

  state = applyHintTier(state);
  assert.equal(state.hintTier, 1);
  assert.equal(state.eliminatedIndices.length, 0);

  state = applyHintTier(state);
  assert.equal(state.hintTier, 2);
  assert.equal(state.eliminatedIndices.length, 2);
  assert.ok(!state.eliminatedIndices.includes(card.correctIndex));

  state = applyHintTier(state);
  assert.equal(state.hintTier, 3);

  // Answering with Tier 3 hint gives 40 base points
  state = submitSprintAnswer(state, card.correctIndex);
  assert.equal(state.score, 40);
});

test('losing all 3 shields transitions to defeat with frozen snapshot', () => {
  let state = startSprintRun('all');
  for (let i = 0; i < 3; i++) {
    const card = state.deck[state.roundIndex];
    const wrongIdx = (card.correctIndex + 1) % 4;
    state = submitSprintAnswer(state, wrongIdx);
    assert.equal(state.lastOutcome, 'wrong');
    assert.equal(state.shields, 2 - i);
    state = advanceSprintRound(state);
  }
  assert.equal(state.phase, 'defeat');
  assert.ok(state.finalSnapshot !== null);
  assert.equal(state.finalSnapshot.outcome, 'defeat');
  assert.equal(state.finalSnapshot.shieldsRemaining, 0);
});

test('clearing every card in deck transitions to victory snapshot', () => {
  let state = startSprintRun('units1to3');
  const totalCards = state.deck.length;
  for (let i = 0; i < totalCards; i++) {
    const card = state.deck[state.roundIndex];
    state = submitSprintAnswer(state, card.correctIndex);
    state = advanceSprintRound(state);
  }
  assert.equal(state.phase, 'victory');
  assert.ok(state.finalSnapshot !== null);
  assert.equal(state.finalSnapshot.outcome, 'victory');
  assert.equal(state.finalSnapshot.accuracyPercent, 100);
  assert.equal(state.finalSnapshot.correctCount, totalCards);
});
