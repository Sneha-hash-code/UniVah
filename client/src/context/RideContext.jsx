import { createContext, useContext, useState } from "react";

const RideContext = createContext();

export function RideProvider({ children }) {
  const [rideRequests, setRideRequests] = useState([]);

  // Passenger sends a request
  const requestRide = (ride, passenger) => {
    const newRequest = {
      id: Date.now(),
      rideId: ride.id,
      passenger,
      ride,
      status: "Pending",
    };

    setRideRequests((current) => [...current, newRequest]);

    return newRequest;
  };

  // Driver accepts/rejects a request
  const updateRequestStatus = (requestId, status) => {
    setRideRequests((current) =>
      current.map((request) =>
        request.id === requestId
          ? { ...request, status }
          : request
      )
    );
  };

  // Get requests belonging to a particular ride
  const getRideRequests = (rideId) => {
    return rideRequests.filter(
      (request) => request.rideId === rideId
    );
  };

  return (
    <RideContext.Provider
      value={{
        rideRequests,
        requestRide,
        updateRequestStatus,
        getRideRequests,
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