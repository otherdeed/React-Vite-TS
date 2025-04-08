import { useState } from 'react'
import { FiSearch, FiChevronDown, FiX } from 'react-icons/fi'
import { selectTheme } from '../../app/service/globalSlice'
import { useAppSelector } from '../../app/hooks'

interface CityFilterProps {
  cities: string[]
  selectedCity: string
  onSelectCity: (city: string) => void
}

export const CityFilter = ({ cities, selectedCity, onSelectCity }: CityFilterProps) => {
  const theme = useAppSelector(selectTheme)
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const colors = {
    light: {
      bg: 'bg-white',
      border: 'border-gray-300',
      hoverBorder: 'hover:border-blue-500 focus:ring-blue-500',
      text: 'text-gray-800',
      placeholder: 'text-gray-400',
      dropdownBg: 'bg-white',
      dropdownBorder: 'border-gray-200',
      searchBg: 'bg-gray-50 focus:ring-blue-500',
      itemHover: 'hover:bg-blue-50',
      itemSelected: 'bg-blue-100 text-blue-600',
      clearBtn: 'text-gray-400 hover:text-gray-600',
      noResults: 'text-gray-500'
    },
    dark: {
      bg: 'bg-gray-800',
      border: 'border-gray-600',
      hoverBorder: 'hover:border-gray-400 focus:ring-gray-500',
      text: 'text-gray-100',
      placeholder: 'text-gray-400',
      dropdownBg: 'bg-gray-800',
      dropdownBorder: 'border-gray-600',
      searchBg: 'bg-gray-700 focus:ring-gray-500',
      itemHover: 'hover:bg-gray-700',
      itemSelected: 'bg-gray-700 text-gray-300',
      clearBtn: 'text-gray-400 hover:text-gray-200',
      noResults: 'text-gray-400'
    }
  }

  const currentColors = theme === 'dark' ? colors.dark : colors.light

  const filteredCities = [...cities]
    .sort((a, b) => a.localeCompare(b))
    .filter(city => 
      city.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const handleSelect = (city: string) => {
    onSelectCity(city)
    setIsOpen(false)
    setSearchTerm('')
  }

  const clearSelection = () => {
    onSelectCity('')
    setIsOpen(false)
    setSearchTerm('')
  }

  return (
    <div className="relative w-full max-w-xl sm:w-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-2 text-left ${currentColors.bg} border ${currentColors.border} rounded-lg shadow-sm ${currentColors.hoverBorder} focus:outline-none focus:ring-2  transition-all duration-200 ${currentColors.text}`}
      >
        <span className="truncate">
          {selectedCity || 'Select city'}
        </span>
        <div className="flex items-center space-x-2">
          {selectedCity && (
            <button 
              onClick={(e) => {
                e.stopPropagation()
                clearSelection()
              }}
              className={currentColors.clearBtn}
            >
              <FiX size={16} />
            </button>
          )}
          <FiChevronDown 
            className={`transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''} ${currentColors.text}`} 
          />
        </div>
      </button>

      {isOpen && (
        <div className={`absolute z-10 w-full mt-1 ${currentColors.dropdownBg} border ${currentColors.dropdownBorder} rounded-lg shadow-lg overflow-hidden`}>
          <div className={`p-2 border-b ${currentColors.dropdownBorder}`}>
            <div className="relative">
              <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentColors.placeholder}`} />
              <input
                type="text"
                placeholder="Search city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 ${currentColors.searchBg} rounded-md focus:outline-none focus:ring-2 ${currentColors.text}`}
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleSelect(city)}
                  className={`w-full px-4 py-2 text-left ${currentColors.text} transition-colors ${
                    selectedCity === city 
                      ? currentColors.itemSelected
                      : currentColors.itemHover
                  }`}
                >
                  {city}
                </button>
              ))
            ) : (
              <div className={`px-4 py-3 text-center ${currentColors.noResults}`}>
                City not found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}