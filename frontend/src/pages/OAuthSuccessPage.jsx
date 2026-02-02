import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const OAuthSuccessPage = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    useEffect(() => {
        const token = searchParams.get('token')
        const userId = searchParams.get('userId')
        const profileCompleted = searchParams.get('profileCompleted') === 'true'

        if (token) {
            localStorage.setItem('authToken', token)
            if (userId) localStorage.setItem('userId', userId)

            if (profileCompleted) {
                navigate('/home')
            } else {
                navigate('/profile-setup')
            }
        } else {
            navigate('/')
        }
    }, [searchParams, navigate])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 text-center">Authenticating...</p>
            </div>
        </div>
    )
}

export default OAuthSuccessPage
