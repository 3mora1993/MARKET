import React from 'react';
import { MapPin, Mail, Phone, Calendar, Building2, UserCheck } from 'lucide-react';
import type { BusinessProfile } from '../../types/profile';

interface ProfileHeaderProps {
  profile: BusinessProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const getRoleBadge = (role: string) => {
    const badges = {
      supplier: 'bg-blue-100 text-blue-800',
      buyer: 'bg-green-100 text-green-800',
      both: 'bg-purple-100 text-purple-800'
    };
    return badges[role as keyof typeof badges] || badges.buyer;
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-32 h-32 rounded-lg object-cover"
        />
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getRoleBadge(profile.role)}`}>
              {profile.role}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4">{profile.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-5 h-5" />
              <a href={`mailto:${profile.contactEmail}`} className="text-blue-600 hover:underline">
                {profile.contactEmail}
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-5 h-5" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>Member since {new Date(profile.joinedDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}