export const Skeleton = ({ w="100%", h=20, r=8, style={} }) => (
  <div className="skeleton" style={{ width:w, height:h, borderRadius:r, ...style }}/>
);