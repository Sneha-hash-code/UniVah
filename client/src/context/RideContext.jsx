import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

const RideContext = createContext();

export function RideProvider({ children }) {
  const [rideRequests, setRideRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Passenger sends a request
  const requestRide = useCallback(async (ride) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Please log in to request a ride");
    }

    if (!ride?._id) {
      throw new Error("Invalid ride");
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/ride-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rideId: ride._id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send ride request"
        );
      }

      setRideRequests((current) => [
        data.request,
        ...current,
      ]);

      return data.request;
    } finally {
      setLoading(false);
    }
  }, []);

  // Driver gets requests for their ride
  const getRideRequests = useCallback(async (rideId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Please log in");
    }

    const response = await fetch(
      `http://localhost:5000/api/ride-requests/ride/${rideId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch ride requests"
      );
    }

    setRideRequests(data.requests || []);

    return data.requests || [];
  }, []);

  // Passenger gets their own requests
  const getMyRideRequests = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Please log in");
    }

    const response = await fetch(
      "http://localhost:5000/api/ride-requests/my",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch your ride requests"
      );
    }

    setRideRequests(data.requests || []);

    return data.requests || [];
  }, []);

  // Driver accepts or rejects a request
  const updateRequestStatus = useCallback(async (
    requestId,
    status
  ) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Please log in");
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/ride-requests/${requestId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update ride request"
        );
      }

      setRideRequests((current) =>
        current.map((request) =>
          request._id === requestId
            ? data.request
            : request
        )
      );

      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <RideContext.Provider
      value={{
        rideRequests,
        requestRide,
        getRideRequests,
        getMyRideRequests,
        updateRequestStatus,
        loading,
      }}
    >
      {children}
    </RideContext.Provider>
  );
}

export function useRide() {
  const context = useContext(RideContext);

  if (!context) {
    throw new Error(
      "useRide must be used inside RideProvider"
    );
  }

  return context;
}