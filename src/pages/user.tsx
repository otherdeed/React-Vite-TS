import { useGetUserQuery } from '../app/service/api'
import { Button } from '../components/button'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader } from '../static/loader'
import { IoIosUndo } from "react-icons/io"
import { useAppSelector } from '../app/hooks'
import { selectTheme } from '../app/service/globalSlice'

export const UserPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: user, isLoading, isError, refetch } = useGetUserQuery(id!)
  const navigate = useNavigate()
  const theme = useAppSelector(selectTheme)

  const containerStyles = theme === 'dark'
    ? 'bg-gray-700 text-white'
    : 'bg-gray-200 text-gray-800'

  const cardStyles = theme === 'dark'
    ? 'bg-gray-800 border-gray-700 shadow-lg'
    : 'bg-gray-50 border-gray-200 shadow-md'

  const textSecondary = theme === 'dark'
    ? 'text-gray-300'
    : 'text-gray-600'

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center h-screen ${containerStyles}`}>
        <Loader />
      </div>
    )
  }

  if (isError) {
    return (
      <div className={`flex flex-col items-center justify-center h-screen gap-4 ${containerStyles}`}>
        <div className="text-xl text-red-500">Error loading user data</div>
        <Button onClick={refetch}>Retry</Button>
      </div>
    )
  }

  if (!user) {
    return (
      <div className={`flex justify-center items-center h-screen ${containerStyles}`}>
        <div className="text-xl">User not found</div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${containerStyles} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-14">
        <Button
          onClick={() => navigate(-1)}
          className="fixed left-3 top-1 p-2"
          aria-label="Go back"
        >
          <IoIosUndo className="text-xl" />
        </Button>

        <div className={`max-w-2xl mx-auto rounded-lg overflow-hidden border ${cardStyles}`}>
          <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
              {user.name}
            </h1>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className={`font-medium w-28 sm:w-32 mb-1 sm:mb-0 text-sm sm:text-base ${textSecondary}`}>
                  Username:
                </span>
                <span className="text-sm sm:text-base">{user.username}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className={`font-medium w-28 sm:w-32 mb-1 sm:mb-0 text-sm sm:text-base ${textSecondary}`}>
                  Email:
                </span>
                <span className="text-sm sm:text-base">{user.email}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className={`font-medium w-28 sm:w-32 mb-1 sm:mb-0 text-sm sm:text-base ${textSecondary}`}>
                  Phone:
                </span>
                <span className="text-sm sm:text-base">{user.phone}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className={`font-medium w-28 sm:w-32 mb-1 sm:mb-0 text-sm sm:text-base ${textSecondary}`}>
                  Website:
                </span>
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-blue-500 hover:underline"
                >
                  {user.website}
                </a>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className={`font-medium w-28 sm:w-32 mb-1 sm:mb-0 text-sm sm:text-base ${textSecondary}`}>
                  Address:
                </span>
                <div>
                  <span className="text-sm sm:text-base">{user.address.city}, </span>
                  <span className="text-sm sm:text-base">{user.address.street}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPage