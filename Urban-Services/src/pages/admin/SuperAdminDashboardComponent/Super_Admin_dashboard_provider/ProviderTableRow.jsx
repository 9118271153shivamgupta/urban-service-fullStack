import React from 'react';
import { Briefcase, Award, Trash2, PlusCircle, Loader2 } from 'lucide-react';

const ProviderTableRow = ({ 
    provider, 
    getProviderCategories, 
    setSelectedProviderServices, 
    setActiveProviderName, 
    setAddServiceModalUser, 
    handleDeleteProvider, 
    deletingId 
}) => {
    const providerServices = getProviderCategories(provider);

    return (
        <tr className="hover:bg-white/5 transition-colors">
            <td className="p-4 flex items-center gap-3 font-bold text-white">
                <div className="p-2 bg-orange-600/10 text-orange-400 rounded-lg">
                    <Briefcase size={16}/>
                </div>
                <div>
                    <p className="text-sm font-bold text-white leading-tight">{provider.name}</p>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">{provider.username || 'user'}</p>
                </div>
            </td>

            <td className="p-4 text-center">
                {providerServices.length > 0 ? (
                    <button 
                        onClick={() => {
                            setSelectedProviderServices(providerServices);
                            setActiveProviderName(provider.name);
                        }}
                        className="px-3 py-1.5 bg-orange-600/10 hover:bg-orange-600/20 text-orange-400 border border-orange-500/20 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                    >
                        View Services ({providerServices.length})
                    </button>
                ) : (
                    <span className="text-gray-600 text-xs italic">No services linked</span>
                )}
            </td>

            <td className="p-4 text-gray-300 text-xs">
                <div className="flex items-center gap-1.5">
                    <Award size={14} className="text-gray-500"/>
                    {provider.providerInfo?.experience || provider.experience || 'N/A'}
                </div>
            </td>

            <td className="p-4 text-gray-400 text-xs uppercase font-medium">
                {provider.providerInfo?.serviceRange || provider.city || 'Gorakhpur'}
            </td>

            <td className="p-4 text-gray-300 text-xs font-mono">
                <p>{provider.phone}</p>
                <p className="text-[10px] text-gray-500 font-sans truncate max-w-[150px]">{provider.email}</p>
            </td>

            <td className="p-4 text-center">
                <button
                    onClick={() => setAddServiceModalUser(provider)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer active:scale-95"
                >
                    <PlusCircle size={13} />
                    Add New
                </button>
            </td>

            <td className="p-4 text-center">
                <button
                    disabled={deletingId === provider._id}
                    onClick={() => handleDeleteProvider(provider._id, provider.name)}
                    className="p-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
                >
                    {deletingId === provider._id ? (
                        <Loader2 size={14} className="animate-spin" />
                    ) : (
                        <Trash2 size={14} />
                    )}
                </button>
            </td>
        </tr>
    );
};

export default ProviderTableRow;


