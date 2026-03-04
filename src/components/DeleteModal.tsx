const DeleteModal = ({ onConfirm, onCancel }: { onConfirm: () => void, onCancel: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-80 flex flex-col gap-4">
        <h3 className="do-hyeon text-lg font-bold">기록 삭제</h3>
        <p className="text-slate-600">이 수영 기록을 정말 삭제할까요?</p>
        <div className="flex gap-3 justify-end mt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal