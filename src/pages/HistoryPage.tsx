import { useEffect, useMemo, useState } from 'react'
import { Clock, Search, Download, Eye, Trash2, Calendar, Database } from 'lucide-react'
import AppLayout from '../components/AppLayout'
import { getHistory, type HistoryItem as ApiHistoryItem } from '../lib/api'

interface HistoryItem {
  id: number
  name: string
  description: string
  stack: string
  createdAt: string
  status: 'completed' | 'failed' | 'in-progress'
}

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'all' | 'completed' | 'failed'>('all')
  const [items, setItems] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    async function load() {
      setLoading(true)
      setError(null)
      const res = await getHistory()
      if (!isMounted) return
      if (res.success) {
        const apiItems: ApiHistoryItem[] = (res.data as any)?.history || []
        const mapped: HistoryItem[] = apiItems.map((h) => {
          const name = (h as any)?.spec?.metadata?.name || (h as any)?.project_name || (h.prompt?.slice(0, 40) || 'Generated Backend')
          const description = (h as any)?.spec?.metadata?.description || h.prompt || ''
          const stackParts: string[] = []
          const stack = (h as any)?.spec?.stack
          if (stack?.language) stackParts.push(stack.language)
          if (stack?.framework) stackParts.push(stack.framework)
          if (stack?.orm) stackParts.push(stack.orm)
          const stackLabel = stackParts.join(' + ') || '—'
          return {
            id: h.id,
            name,
            description,
            stack: stackLabel,
            createdAt: (h as any)?.created_at || '',
            status: 'completed',
          }
        })
        setItems(mapped)
      } else {
        setError(res.error || 'Failed to load history')
      }
      setLoading(false)
    }
    load()
    return () => { isMounted = false }
  }, [])

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filter === 'all' || item.status === filter
      return matchesSearch && matchesFilter
    })
  }, [items, searchTerm, filter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'failed': return 'bg-red-100 text-red-800 border-red-200'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // const getStatusIcon = (status: string) => {
  //   switch (status) {
  //     case 'completed': return <Code className="w-4 h-4" />
  //     case 'failed': return <Trash2 className="w-4 h-4" />
  //     case 'in-progress': return <Clock className="w-4 h-4" />
  //     default: return <Clock className="w-4 h-4" />
  //   }
  // }

  return (
    <AppLayout
      title="Generation History"
      subtitle="View and manage your previously generated backends"
    >
      {/* Search and Filter */}
      <div className="card mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search backends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`btn-sm ${
                filter === 'all'
                  ? 'btn-primary'
                  : 'btn-secondary'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`btn-sm ${
                filter === 'completed'
                  ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200'
                  : 'btn-secondary'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter('failed')}
              className={`btn-sm ${
                filter === 'failed'
                  ? 'bg-red-100 text-red-700 border border-red-200 hover:bg-red-200'
                  : 'btn-secondary'
              }`}
            >
              Failed
            </button>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-6">
        {loading ? (
          <div className="card text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft">
              <Clock className="w-10 h-10 text-neutral-400 animate-pulse" />
            </div>
            <p className="text-neutral-600">Loading history...</p>
          </div>
        ) : error ? (
          <div className="card text-center">
            <h3 className="text-xl font-display font-semibold text-red-700 mb-2">{error}</h3>
            <p className="text-neutral-600">Please try again later.</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="card text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft">
              <Clock className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">No history found</h3>
            <p className="text-neutral-600">Start generating backends to see them here</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="card-hover">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-display font-semibold text-neutral-900">{item.name}</h3>
                    <span className={`badge ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-neutral-600 mb-4">{item.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-neutral-500">
                    <div className="flex items-center space-x-2">
                      <Database className="w-4 h-4" />
                      <span>{item.stack}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{item.createdAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-6">
                  <button className="p-3 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-3 text-neutral-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-3 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </AppLayout>
  )
}
