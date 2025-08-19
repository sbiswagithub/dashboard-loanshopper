import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, Plus } from 'lucide-react';

interface Document {
  id: string;
  filename: string;
  submittedTime: string;
}

interface DocumentType {
  id: string;
  title: string;
  documents: Document[];
}

const DocumentsPage: React.FC = () => {
  const [documentTypes] = useState<DocumentType[]>([
    {
      id: 'identity',
      title: 'Identity',
      documents: [
        {
          id: '1',
          filename: 'passport.pdf',
          submittedTime: '10:30 AM'
        },
        {
          id: '2',
          filename: 'drivers-license.pdf',
          submittedTime: '11:15 AM'
        }
      ]
    },
    {
      id: 'income',
      title: 'Income and liability',
      documents: [
        {
          id: '3',
          filename: 'payslip.pdf',
          submittedTime: '09:45 AM'
        }
      ]
    },
    {
      id: 'bank',
      title: 'Bank statements',
      documents: [
        {
          id: '4',
          filename: 'bank-statement.pdf',
          submittedTime: '08:30 AM'
        }
      ]
    },
    {
      id: 'other',
      title: 'Other',
      documents: []
    }
  ]);

  const [activeTab, setActiveTab] = useState('identity');

  const handleDeleteDocument = (docId: string) => {
    console.log('Delete document:', docId);
  };

  const handleAddDocument = (typeId: string) => {
    console.log('Add document to:', typeId);
  };

  const renderDocumentGroup = (documents: Document[], typeTitle: string, typeId: string) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center ">
        <h6 className="font-semibold text-foreground ">{typeTitle}</h6>
        <Button 
          size="sm"
          onClick={() => handleAddDocument(typeId)}
          className="rounded-full  w-8 h-8 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      {documents.length > 0 && (
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <div key={doc.id}>
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-xs text-foreground">{doc.filename}</span>
                      <span className="text-xs text-muted-foreground">Submitted {doc.submittedTime}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  {index < documents.length - 1 && <hr className="my-3" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-semibold text-foreground">My documents</h5>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6 text-[#4e73df]">
          <TabsTrigger value="identity" className="text-sm font-semibold">
            Identity
          </TabsTrigger>
          <TabsTrigger value="income" className="text-sm font-semibold">
            Income and liability
          </TabsTrigger>
          <TabsTrigger value="bank" className="text-sm font-semibold">
            Bank statements
          </TabsTrigger>
          <TabsTrigger value="other" className="text-sm font-semibold">
            Other
          </TabsTrigger>
        </TabsList>

        <TabsContent value="identity" className="space-y-6">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-6">
                {renderDocumentGroup(
                  documentTypes.find(t => t.id === 'identity')?.documents || [],
                  'Document type A',
                  'identity-a'
                )}
                {renderDocumentGroup(
                  [
                    { id: '5', filename: 'filename2.pdf', submittedTime: '10:30 AM' },
                    { id: '6', filename: 'filename3.pdf', submittedTime: '11:45 AM' }
                  ],
                  'Document type B',
                  'identity-b'
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-6">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              {renderDocumentGroup(
                documentTypes.find(t => t.id === 'income')?.documents || [],
                'Income Documents',
                'income'
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank" className="space-y-6">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              {renderDocumentGroup(
                documentTypes.find(t => t.id === 'bank')?.documents || [],
                'Bank Statements',
                'bank'
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="other" className="space-y-6">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              {renderDocumentGroup(
                documentTypes.find(t => t.id === 'other')?.documents || [],
                'Other Documents',
                'other'
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentsPage;