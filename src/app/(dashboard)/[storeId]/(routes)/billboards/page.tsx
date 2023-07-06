import BillboardClient from './components/billboard-client'

const BillboardsPage: React.FC = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-4 py-6">
        <BillboardClient />
      </div>
    </div>
  )
}

export default BillboardsPage
