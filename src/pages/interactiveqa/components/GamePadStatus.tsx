
export default function GamePadStatus({ gamepadConnected }: { gamepadConnected: boolean }) {
  return (
    <>
      {gamepadConnected && (
        <div
          className="absolute top-2 right-6 bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">
          Gamepad Connected
        </div>
      )}
    </>
  )
}
