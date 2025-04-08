import { useEffect, useState } from 'react'
import { useGetUsersQuery } from '../app/service/api'
import { Card } from '../components/card'
import { Button } from '../components/button'
import type { User } from '../types/user.type'
import { Input } from '../components/input'
import { CityFilter } from '../components/filter'

const IndexPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const cities:string[] = []
  const { data: response, isLoading, isError, refetch } = useGetUsersQuery()
  const setFilterCity = () => {
    response?.map(user => cities.push(user.address.city))
  }
  const filteredUsers = response?.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    user.address.city.toLowerCase().includes(selectedCity.toLowerCase())
  ) || []

  useEffect(() =>{
    setFilterCity()
  })
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-medium">Loading users...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="text-xl text-red-500">Error loading users</div>
        <Button onClick={refetch}>Retry</Button>
      </div>
    )
  }

  if (!response) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">No users found</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users List</h1>
      </div>
      <div className="py-2">
      <CityFilter 
        cities={cities}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
      />
      
      {selectedCity && (
        <div className="mt-4 ml-1">
          City selected: <span className="font-semibold">{selectedCity}</span>
        </div>
      )}
    </div>
      <Input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />
      
      <div className="flex flex-wrap gap-10 justify-center sm:justify-left">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user: User) => (
            <Card key={user.id} {...user} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No users found matching your search
          </div>
        )}
      </div>
    </div>
  )
}

export default IndexPage