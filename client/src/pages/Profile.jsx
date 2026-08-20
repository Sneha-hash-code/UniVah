import { User, Mail, Phone, Shield } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <main className="min-h-[80vh] bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            My Profile
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your UniVah account information.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          {/* Profile Header */}
          <div className="bg-blue-600 px-6 py-8 text-white sm:px-8">
            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600">
                <User size={30} />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {user?.name}
                </h2>

                <p className="mt-1 text-blue-100">
                  {user?.role}
                </p>
              </div>

            </div>
          </div>

          {/* User Information */}
          <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">

            <div className="flex items-start gap-3">
              <Mail className="mt-1 text-blue-600" size={20} />

              <div>
                <p className="text-sm text-slate-500">
                  Email
                </p>

                <p className="font-medium text-slate-900">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="mt-1 text-blue-600" size={20} />

              <div>
                <p className="text-sm text-slate-500">
                  Phone
                </p>

                <p className="font-medium text-slate-900">
                  {user?.phone || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="mt-1 text-blue-600" size={20} />

              <div>
                <p className="text-sm text-slate-500">
                  Account Type
                </p>

                <p className="font-medium capitalize text-slate-900">
                  {user?.role}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;