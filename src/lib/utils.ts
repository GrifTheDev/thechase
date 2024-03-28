async function changeGameState(newState: number) {
    const res = await fetch("/api/game_state_change", {
        method: "POST",
        body: JSON.stringify({
          gameState: newState
        }),
      });
}

export {changeGameState}